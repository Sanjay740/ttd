const TransactionWorkflow = require("../models/client/huddle/transactionWorkFlow");
const Role = require("../models/client/userManagement/role");
const User = require("../models/client/userManagement/user");
let Transaction = require("../models/client/huddle/transaction");
let TransactionAudit = require("../models/client/huddle/transactionAudit");
let TitleRequest = require("../models/client/order/titleRequestOrder");
const TransactionNumber = require("../models/client/huddle/settings/transactionNumberDescriptor");
const ClientUser = require("../models/client/userManagement/user")
const ResponseMessages = require("../util/responseMessages");
const Contact = require("../models/client/common/contact");
const EmailUtil = require('../util/email')
const Config = require('../config/config')
const Token = require('../models/client/common/token');
const DocumentManager = require("./document.manager");
const randtoken = require('rand-token');
const configurationManager = require("./configurationSettings.manager");
const orderManager = require("./order.manager");
const notification = require("../notifications/redisNotificationChannels");
let findIndex = require("../util/common").findIndex;
const OrderSummary = require("../models/client/order/orderSummary");
const Logger = require("../config/logger");
const ical = require('ical-generator');
const cal = ical({ domain: 'github.com', name: 'my first iCal' })
var moment = require('moment');

module.exports.inviteUsers = async function (detail, subdomain) {
  let userEmails = detail.userEmails;
  // 1. Get the emails from the request.
  // 2. Send invitations to the emails by appending url to template.
  // 3. Update Status back that Invited to User Collection.
  try {
    userEmails.forEach(async userEmail => {
      let contact = await getContactbyEmail(userEmail, subdomain);
      let mailSendingTask = contact.persons.map(async (person, i) => {
        let user = await ClientUser.getModel(subdomain).findOne({ email: person.email })
        if (!user) {
          let userObj = {
            name: contact.persons[i].firstName,
            email: contact.persons[i].email,
            status: 'Invited'
          }
          let ClientUserModel = ClientUser.getModel(subdomain)
          user = await new ClientUserModel(userObj).save();
        }
        let invitation_url = await linkForUserInvitation(user, subdomain, detail.transactionId, detail.taskId);
        if (detail.taskId) {
          await this.notifyTaskSubmitted(subdomain, detail.transactionId, detail.taskId)
        }
        await EmailUtil.userInvitationMail(user.email, user.name, invitation_url)
      })
      await Promise.all(mailSendingTask);
    })
    return {
      code: 200, message: "Successfully invited Users"
    }
  } catch (error) {
    Logger.log(
      "An error occurred while invite Users " +
      error,
      "inviteUsers"
    );
    return {
      code: 500, message: ResponseMessages.TryLater
    }
  }
};

async function getContactbyEmail(userEmail, subdomain) {
  let contact = await Contact.getModel(subdomain).findOne({ 'persons.email': userEmail });
  return contact;
}

async function linkForUserInvitation(user, subdomain, transactionId, taskId) {
  try {
    let TokenModel = Token.getModel();
    var userRegistration_Token = user._id + randtoken.generate(50);
    var navigationPath = "registerPortalUser?registration_token=" + userRegistration_Token + "&transactionId=" + transactionId + "&taskId=" + taskId;
    var url = Config.getSubdomainAddress(subdomain, navigationPath);
    let user_token = await TokenModel.findOne({ userId: user._id, tokenFor: "user-Registration" })

    let today = new Date()
    let expiresAt = today.setDate(today.getDate() + 10);// Valid for 10 days after generated.

    if (user_token) {
      let data = await TokenModel.update(
        { userId: user._id, tokenFor: "user-Registration" },
        {
          $set: { token: userRegistration_Token, expiresAt: expiresAt }
        })
      return url;
    }
    else {
      let data = new TokenModel({
        userId: user._id,
        token: userRegistration_Token,
        tokenFor: "user-Registration",
        expiresAt: expiresAt
      });
      await data.save();
      return url;
    }
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    }
  }
}


module.exports.listContactsForInvitation = async function (id, subdomain) {
  // Get the transaction number and figure out the contacts which are not yet invited by looking into User Collection.
  // at the time of starting a transaction, we make the entry of all users which are supposed to be in the transaction.
  // We are open to invite all the users in the transaction to the client portal.  (TODO: we may restrict it by setting in configuration)
  // This may come in picture after discussion with a title company).
  try {
    let contacts = [];
    let transaction = await Transaction.getModel(subdomain).findOne({ _id: id });
    let task = transaction.contacts.map(async (userContact) => {

      /**
       * `lean()` allows the modification of data returned by the query in mongodb
       */
      let contact = await Contact.getModel(subdomain).findOne({ _id: userContact }).lean();
      let data = await ClientUser.getModel(subdomain).findOne({ email: contact.persons[0].email })

      if (data) {
        if (data.status === 'Active') {
          contact.status = "Registered";
        }
        else {
          contact.status = 'Invited';
        }
      }
      else {
        contact.status = 'New'
      }
      return contact;
    })
    contacts = await Promise.all(task);
    return { code: 200, data: contacts }
  } catch (error) {
    Logger.log(
      "An error occurred while listing the contacts for Invitation: " +
      error,
      "listContactsForInvitation"
    );
    return {
      code: 500, message: ResponseMessages.TryLater
    }
  }
};

module.exports.getTransactionsbyUserId = async function (request) {
  try {
    let input = request.query;
    let query = {};
    let searchStringQuery = { $regex: input.searchString, $options: "i" };
    query = input.searchString
      ? { status: input.status, number: searchStringQuery }
      : { status: input.status };

    let userId = input.userId;

    let user = await ClientUser.getModel(request.headers["subdomain"]).findOne({ _id: userId })
    let result = await Transaction.getModel(request.headers["subdomain"]).aggregate([
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "contacts",
          localField: "contacts",
          foreignField: "_id",
          as: "contacts"
        }
      },
      {
        $match: query
      }
    ]);
    if (!!user.head) {
      return { code: 200, data: { transactionsData: result ? result : null } };
    }
    else {
      let userTransactions = [];
      result.forEach(async (transaction) => {
        let data = await transaction.contacts.find(contact => contact.email == user.email);
        if (data) {
          userTransactions.push(transaction);
        }
      })
      return {
        code: 200, data: { transactionsData: userTransactions ? userTransactions : null }
      }
    }
  }
  catch (error) {
    Logger.log(
      "An error occurred while getting the transactions by current logged in user email: " +
      error,
      "getTransactionsbyUserId"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
}

module.exports.getTransactions = async function (request) {
  // 1. get the transactions as per status.
  // 2. from ui, request will be made for InProgress transactions, new Transactions and closed Transactions.
  // 3. Remember that we have to list New Transactions from Title Request Collection, whereas Closed and InProgress Transactions will
  //    be listed from the Transaction collection.
  try {
    let input = request.query;
    let query = {};
    // Select the field type on the bases of selected collection 
    let property = request.params["status"] === "New" ? 'orderNumber' : 'numberDescriptor.number'
    let searchStringQuery = { $regex: input.searchString, $options: "i" };
    // Define search query object.
    query = input.searchString
      ? { status: request.params["status"], [property]: searchStringQuery }
      : { status: request.params["status"] };

      console.log(query);
      
    if (request.params["status"] === "New") {
      let result = await TitleRequest.getModel(
        request.headers["subdomain"]
      ).paginate(query, {
        page: parseInt(input.page),
        limit: parseInt(input.limit),
        sort: { _id: -1 }
      });
      return { code: 200, data: { orders: result ? result : null } };
    }
    else {
      let result = await Transaction.getModel(request.headers["subdomain"]).aggregate([
        { $sort: { _id: -1 } }, // Latest first
        {
          $lookup: {
            from: "transactionworkflows",
            localField: "_id",
            foreignField: "transactionId",
            as: "workflow"
          }
        },
        {
          $lookup: {
            from: "contacts",
            localField: "contacts",
            foreignField: "_id",
            as: "contacts"
          }
        },
        { $unwind: "$workflow" },
        {
          $match: query
        },
        { $skip: parseInt(input.page) },
        { $limit: parseInt(input.limit) }
      ]);
      return { code: 200, data: { orders: result ? result : null } };
    }
  }
  catch (error) {
    Logger.log(
      "An error occurred while getting " + request.params["status"] + "Transactions : " +
      error,
      "getTransactions"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

// get all transaction documents new as well as previous uploaded
async function getTransactionDocuments(data) {
  let attachments = [];
  if (data.attachments.length > 0) {
    attachments = await getAttachments(data.attachments, data.document);
  } else {
    attachments = data.document;
  }
  return attachments;
}


module.exports.updateTransaction = async function (request) {
  // context can be anything closingDate, closingLocation, contact etc.
  try {
    let auditObj = {};
    let TransactionModel = Transaction.getModel(request.headers["subdomain"]);
    let transactionData = request.query.context == 'document' ? await getTransactionDocuments(request.body.jsonData) : request.body.jsonData;
    // Write the context for which the transaction needs to update the data.
    if (request.query.context) {
      await TransactionModel.updateOne(
        { _id: request.query.transactionId },
        {
          "documents": transactionData
        }
      );
      auditObj = {
        context: request.query.context,
        value: transactionData,
      }
    } else {
      auditObj = { value: transactionData };
      await TransactionModel.updateMany(
        { _id: request.query.transactionId },
        {
          $set: request.body.jsonData
        }
      );
    }
    let TransactionAuditModel = TransactionAudit.getModel(request.headers["subdomain"]);
    let transactionAudit = new TransactionAuditModel(auditObj);
    await transactionAudit.save();
    return {
      code: 200,
      data: { message: "Transaction updated successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating the transaction section" +
      error,
      "updateTransaction"
    );
    if (request.body.jsonData.attachments && request.body.jsonData.attachments.length != 0) {
      let promises = request.body.jsonData.attachements.map(attachement => DocumentManager.deleteRemoteFile({ fileName: attachement.path, fileId: attachement.fileId }));
      await Promise.all(promises);
    }
    return { code: 500, message: ResponseMessages.TryLater };
  }
};


module.exports.startTransaction = async function (request) {
  try {
    let input = request.body;
    let contactFields = [{ roleName: 'Other', value: input.transactionDetail.requestor }, { roleName: 'Seller', value: input.transactionDetail.sellerInformation }, { roleName: 'Buyer', value: input.transactionDetail.buyerInformation }, { roleName: 'MortgageBroker', value: input.transactionDetail.refinanceInformation }]
    // extract the contacts from the transactions and which emails does not exist in the User Collection, enter those
    // emails with basic details extracted from contact object with InActive status.
    let contacts = await extractContacts(contactFields, request.headers["subdomain"]);
    // convert TITLEREQUEST json to transaction json Schema. the transaction status would be Pending.
    let transactionObj = {
      numberDescriptor: input.numberDescriptor,
      propertyAddress: input.transactionDetail.propertyAddress,
      contacts: contacts,
      documents: input.transactionDetail.attachments,
      referenceNumber: input.transactionDetail.orderNumber
    }

    let TransactionModel = Transaction.getModel(request.headers["subdomain"])
    let transaction = await new TransactionModel(transactionObj).save();
    let TransactionWorkflowModel = TransactionWorkflow.getModel(request.headers["subdomain"]);
    // Create workflow for the given transaction.
    let workflowObj = {
      title: input.workflow.title,
      tasks: input.workflow.tasks,
      description: input.workflow.description,
      transactionId: transaction._id
    }
    let workflowData = new TransactionWorkflowModel(workflowObj)
    let workflow = await workflowData.save();
    //UPDATE THE TITLE ORDER REQUEST
    await TitleRequest.getModel(request.headers["subdomain"]).updateOne({ _id: input.transactionDetail._id }, { "status": "Imported" });
    //UPDATE the ORDer Summary Model for respected orderNumber
    await OrderSummary.getModel(request.headers["subdomain"]).updateOne({ orderNumber: input.transactionDetail.orderNumber }, { "status": "Imported" });
    // send notification to those user which is set by admin for service requested processed
    let userIds = await orderManager.getNotificationSettingUsersId(request.headers["subdomain"], 'ServiceRequestProcessed')
    if (userIds.length > 0) {
      notification.requestedServiceProcessed(request.headers["subdomain"], userIds, transaction._id);
    }
    // response of this api will contain 1) transaction details json and transaction workflow json.
    return { code: 200, data: { transaction: transaction, workflow: workflow, message: "Transaction started successfully." } }
  } catch (error) {
    Logger.log(
      "An error occurred while start the transaction" +
      error,
      "startTransaction"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};


async function extractContacts(contactFields, subdomain) {
  let RoleModel = Role.getModel(subdomain);
  let ContactModel = Contact.getModel(subdomain);
  let contact = contactFields.map(async (element) => {
    if (element.value.persons[0].email) {
      element.value.role.name = element.roleName;
      let role = await RoleModel.findOne({ name: element.roleName });
      element.value.role.id = role._id;
      let contactData = new ContactModel(element.value);
      let result = await contactData.save();
      return result._id;
    } else {
      return null
    }
  });
  let contacts = await Promise.all(contact);
  let data = contacts.filter(a => a != null);
  return data;

}

module.exports.getTransactionNumber = async function (request) {
  // Fetch the Prefix , Suffix and last Number generated last time and add 1 return combining it.
  // return prefix + number + suffix.
  try {
    let transactionNumber = await TransactionNumber.getModel(request.headers["subdomain"]).findOne({});
    let transaction = await Transaction.getModel(request.headers["subdomain"]).findOne({}).sort({ _id: -1 });
    let numberDescriptor = { prefix: null, number: null, suffix: null };
    if (transaction) {
      numberDescriptor.number = Number.parseInt(transaction.numberDescriptor.number) + 1;
    }
    else if (transactionNumber) {
      numberDescriptor.number = transactionNumber.number;
      numberDescriptor.prefix = transactionNumber.prefix;
      numberDescriptor.suffix = transactionNumber.suffix;
    }
    return { code: 200, data: { numberDescriptor: numberDescriptor } };
  } catch (error) {
    return { code: 500, message: ResponseMessages.TryLater };
  }
};


module.exports.getTransaction = async function (request) {
  // transaction Number is sent in the request, grab that and fetch the workflow and transactiondetails.
  try {
    let order = await Transaction.getModel(request.headers["subdomain"]).aggregate([
      {
        $lookup: {
          from: "transactionworkflows",
          localField: "_id",
          foreignField: "transactionId",
          as: "workflow"
        }
      },
      {
        $lookup: {
          from: "contacts",
          localField: "contacts",
          foreignField: "_id",
          as: "contacts"
        }
      },
      { $unwind: "$workflow" },
    ]);

    let transaction = await order.find(a => a._id == request.query.transactionId);
    let userDetail = await User.getModel(request.headers['subdomain']).findOne({ email: request.query.userEmail });
    if (!userDetail.head) {
      let contactDetail = await transaction.contacts.find(a => a.persons[0].email == request.query.userEmail);
      if (contactDetail) {
        transaction.workflow.tasks = await getFilteredTask(transaction.workflow.tasks, contactDetail.role);
      }
    }
    return { code: 200, data: { transaction: transaction ? transaction : null } };
  } catch (error) {
    Logger.log(
      "An error occurred while getting the transaction by Id" +
      error,
      "getTransaction"
    );

    return { code: 500, message: ResponseMessages.TryLater };
  }
};

async function getFilteredTask(tasks, userRoleId) {
  let filteredTask = [];
  tasks.forEach(async (task) => {
    let roleExist = task.contacts.find(a => a.role.id == userRoleId);
    if (roleExist) {
      filteredTask.push(task);
    }
  });
  return filteredTask;
}

async function getTaskById(subdomain, transactionId, taskId) {
  let workflowTasks = await TransactionWorkflow.getModel(subdomain).findOne({ transactionId: transactionId }, { tasks: 1, _id: 0 });
  let task = workflowTasks.tasks.find(a => a._id == taskId);
  return task;
}

module.exports.getFormData = async function (request) {
  try {
    let Task = await getTaskById(request.headers["subdomain"], request.query.transactionId, request.query.taskId)
    let formData = Task.FormData;
    return {
      code: 200,
      data: { formData: formData }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while getting the submitted Data against the task" +
      error,
      "getFormData"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
}

module.exports.saveFormData = async function (request) {
  try {
    let workflowTasks = await TransactionWorkflow.getModel(request.headers["subdomain"]).findOne({ transactionId: request.query.transactionId }, { tasks: 1, _id: 0 });
    let task = workflowTasks.tasks.find(a => a._id == request.query.taskId);
    let obj = {};
    obj['tasks.' + task.position + '.FormData'] = request.body.jsonData;
    await TransactionWorkflow.getModel(request.headers["subdomain"]).update(
      { transactionId: request.query.transactionId },
      {
        $set: obj
      }
    );
    await this.notifyTaskSubmitted(request.headers["subdomain"], request.query.transactionId, request.query.taskId)
    return {
      code: 200,
      data: { message: 'Form is successfully submitted' }
    };
  } catch (error) {
    console.log(error);

    Logger.log(
      "An error occurred while submitting the customised task" +
      error,
      "saveFormData"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
}

async function updateTransactionTaskStatus(subdomain, transactionId, status, position) {
  let obj = {};
  obj['tasks.' + position + '.status'] = status;
  await TransactionWorkflow.getModel(subdomain).update(
    { transactionId: transactionId },
    {
      $set: obj
    }
  );
  return true
}

module.exports.updateTaskStatus = async function (request) {
  try {
    let subdomain = request.headers["subdomain"];
    await updateTransactionTaskStatus(subdomain, request.query.transactionId, request.query.status, request.query.position);
    return {
      code: 200,
      data: { message: "Task " + request.query.status + " successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating the task status" +
      error,
      "updateTaskStatus"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.updateTransactionStatus = async function (request) {
  try {
    let subdomain = request.headers["subdomain"];
    await updateTransactionTaskStatus(subdomain, request.query.transactionId, request.query.status, request.query.position);
    return {
      code: 200,
      data: { message: "Task " + request.query.status + " successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating the Transaction status" +
      error,
      "updateTransactionStatus"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

exports.notifyTaskAssign = async function (subdomain, task, transactionId) {
  let contact = await Contact.getModel(subdomain).findOne({ _id: task.assignedTo })
  let user = await ClientUser.getModel(subdomain).findOne({ email: contact.persons[0].email })
  if (!!user) {
    if (task.componentType == "PredefinedForm" || task.componentType == "CustomizedForm") {
      let userIds = new Array(user._id);

      await notification.formTaskAssigned(subdomain, task._id, task.title, task.action, task.componentType, task.formId, transactionId, userIds);
    }
    else if (task.componentType == "Document") {

      notification.DocumentTaskAssigned(subdomain, task._id, task.description, task.action, task.componentType, transactionId, user._id);
    }
    else if (task.componentType == "CalenderForm") {

      let userIds = new Array(user._id);
      await notification.calendarTaskAssigned(subdomain, task._id, task.title, task.action, task.componentType, transactionId, userIds);
    }
  }
}


exports.notifyTaskSubmitted = async function (subdomain, transactionId, taskId, attachments) {
  let Task = await getTaskById(subdomain, transactionId, taskId);
  if (!!Task.assignedTo) {
    let assignedUser = await Contact.getModel(subdomain).findOne({ _id: Task.assignedTo });
    await updateTransactionTaskStatus(subdomain, transactionId, 'Received', Task.position);
    let userIds = await configurationManager.getUsersIds(subdomain, transactionId, taskId);
    if (userIds.length > 0) {
      if (Task.componentType == "PredefinedForm" || Task.componentType == "CustomizedForm") {
        notification.FormTaskSubmitted(subdomain, transactionId, Task._id, assignedUser.persons[0].firstName, Task.title, Task.action, Task.componentType, Task.formId, userIds)
      }
      else if (Task.componentType == "Document") {
        let documents = attachments.map(async (document) => {
          return document['name'];
        })
        let filteredDocuments = await Promise.all(documents);
        let documentName = filteredDocuments.join(", ");
        notification.DocumentTaskSubmitted(subdomain, Task._id, assignedUser.persons[0].firstName, documentName, Task.action, Task.componentType, transactionId, userIds);
      }
      else if (Task.componentType == "CalenderForm") {
        if (attachments.answer) {
          notification.calendarTaskSubmit(subdomain, transactionId, Task._id, assignedUser.persons[0].firstName, Task.title, Task.action, Task.componentType, userIds, attachments)
        }
        else {
          // console.log('in log else..create');
          notification.calendarTaskSubmit(subdomain, transactionId, Task._id, assignedUser.persons[0].firstName, Task.title, Task.action, Task.componentType, userIds, attachments)
        }
      }
    }
  }
}

module.exports.assignTask = async function (request) {
  try {
    obj = {};
    obj['tasks.' + request.body.position + '.requestedDate'] = request.body.requestedDate;
    obj['tasks.' + request.body.position + '.dueDate'] = request.body.dueDate;
    obj['tasks.' + request.body.position + '.assignedTo'] = request.body.assignedTo;
    obj['tasks.' + request.body.position + '.assignedBy'] = request.query.assignedBy;
    await TransactionWorkflow.getModel(request.headers["subdomain"]).update(
      { transactionId: request.query.transactionId },
      {
        $set: obj
      }
    );
    await updateTransactionTaskStatus(request.headers["subdomain"], request.query.transactionId, 'Requested', request.body.position)
    await this.notifyTaskAssign(request.headers["subdomain"], request.body, request.query.transactionId)
    return {
      code: 200,
      data: { message: "Task assigned successfully!." }
    };
  } catch (error) {

    Logger.log(
      "An error occurred while assigning the task to any transaction's contacts " +
      error,
      "assignTask"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};



module.exports.updateTransactionTask = async function (request) {
  try {
    await TransactionWorkflow.getModel(request.headers["subdomain"]).update(
      { transactionId: request.query.transactionId },
      {
        "tasks": request.body
      }
    );
    return {
      code: 200,
      data: { message: request.query.remove ? "Task deleted successfully!." : request.query.edit ? "Task updated successfully!." : "Task added successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating transaction task " +
      error,
      "updateTransactionTask"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};


module.exports.assignContacts = async function (request) {
  let subdomain = request.headers["subdomain"];
  let userModel = User.getModel(subdomain);
  let contactModel = Contact.getModel(subdomain);
  let transactionModel = Transaction.getModel(subdomain);
  let roleModel = Role.getModel(subdomain);
  try {
    let transaction = await Transaction.getModel(subdomain).findOne({ _id: request.query.transactionId }, { _id: 0, contacts: 1 })
    request.body.contacts.forEach(async function (element) {
      let user = await userModel.findOne({ _id: element });
      let role = await roleModel.findById({ _id: user.role });
      let obj = {
        persons: [
          {
            firstName: user.firstName,
            phone: user.mobile,
            address: user.address,
            email: user.email,
          }
        ],
        /**
         * This contactType for system users may be made dynamic. Keeping this hardocoded as per the current requirement.
         */
        contactType: 'Individual',
        role: {
          id: user.role,
          name: role.name
        }
      }
      let alreadyInContact = await contactModel.findOne({ 'persons.email': user.email, 'role.id': user.role })
      let alreadyInTransactionContact = alreadyInContact ? transaction.contacts.find(a => a.toString() === alreadyInContact._id.toString()) : null;
      if (!alreadyInTransactionContact) {
        //save the contacts
        let contactData = await new contactModel(obj);
        let contact = await contactData.save();
        await transactionModel.updateOne({ _id: request.query.transactionId }, { $push: { contacts: contact._id } })
      }
    });
    await this.notifyTaskSubmitted(subdomain, request.query.transactionId, request.query.taskId);
    return {
      code: 200,
      data: { message: "Contact assigned successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while assigning Contacts: " +
      error,
      "assignContacts"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};


module.exports.getUsersByRole = async function (request) {
  try {
    let UserModel = await User.getModel(request.headers['subdomain']);
    let users = await UserModel.aggregate([
      {
        $match: { "isSystemUser": true, "head": false }
      },
      {
        $group: {
          _id: "$role",
          users: { $push: "$$ROOT" }
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "_id",
          foreignField: "_id",
          as: "role"
        }
      },
      { $unwind: "$role" },
    ]);
    return {
      code: 200,
      data: { contacts: users ? users : [], message: "Contact assigned successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while getting the system user by role" +
      error,
      "getUsersByRole"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};


module.exports.taskDocumentUpload = async function (request) {
  try {
    let TransactionModel = Transaction.getModel(request.headers["subdomain"]);
    let workflowModel = TransactionWorkflow.getModel(request.headers["subdomain"]);
    let transaction = await TransactionModel.findOne({ _id: request.query.transactionId })
    let previousTransactionAttachements = transaction.documents;
    let transactionsAttachements = previousTransactionAttachements.length > 0 ? await getAttachments(request.body.jsonData.attachments, previousTransactionAttachements) : request.body.jsonData.attachments;
    await TransactionModel.updateOne(
      { _id: request.query.transactionId },
      { $set: { 'documents': transactionsAttachements } }
    );
    let workflowTasks = await workflowModel.findOne({ transactionId: request.query.transactionId }, { tasks: 1, _id: 0 });
    let task = workflowTasks.tasks.find(a => a._id == request.query.taskId);
    let previousTaskAttachements = task.documents;
    let taskAttachments = previousTaskAttachements.length > 0 ? await getAttachments(request.body.jsonData.attachments, previousTaskAttachements) : request.body.jsonData.attachments;
    let obj = {};
    obj['tasks.' + task.position + '.documents'] = taskAttachments;
    await workflowModel.updateOne(
      { transactionId: request.query.transactionId },
      { $set: obj }
    );
    await this.notifyTaskSubmitted(request.headers["subdomain"], request.query.transactionId, request.query.taskId, request.body.jsonData.attachments)
    return {
      code: 200,
      data: { message: "Documents updated successfully!." }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while uploading the document against the document task" +
      error,
      "taskDocumentUpload"
    );
    if (request.body.jsonData.attachments && request.body.jsonData.attachments.length != 0) {
      let promises = request.body.jsonData.attachments.map(attachement => DocumentManager.deleteRemoteFile({ fileName: attachement.path, fileId: attachement.fileId }));
      await Promise.all(promises);
    }
    return { code: 500, message: ResponseMessages.TryLater };

  }
}


async function getAttachments(newAttachments, previousAttachments) {
  let attachments = [];
  for (let i = 0; i < newAttachments.length; i++) {
    let index = findIndex(previousAttachments, 'name', newAttachments[i].name)
    if (index != -1) {
      let duplicacy = Number.parseInt(previousAttachments[index].duplicacy) + 1;
      previousAttachments[index].duplicacy = duplicacy;
      newAttachments[i].name = newAttachments[i].name + '(' + duplicacy + ')'
    }
  }
  previousAttachments.forEach(element => {
    attachments.push(element);
  });
  newAttachments.forEach(element => {
    attachments.push(element);
  });
  return attachments;
};




exports.emailCalendarTaskUsers = async function (subdomain, transactionId, taskId, emailsData, taskName) {
  emailsData.forEach(async user => {
    await EmailUtil.mailCalendarEventUsers(user, transactionId, taskId, taskName);
  })
};

async function createICalendar(data, name) {
  // console.log('createIcalendar',data);
  const event = {
    summary: data.title,
    start: moment(data.startDate).format("MMM DD YYYY") + " " + data.startTime.HH + ':' + data.startTime.mm + " Z",
    end: moment(data.endDate).format("MMM DD YYYY") + " " + data.endTime.HH + ':' + data.endTime.mm + " Z",
    description: data.description,
    location: data.location.address
  }
  cal.createEvent(event)
  cal.saveSync(`temp/${name}.ics`)
  //  console.log('calData',calData);
}

module.exports.saveCalendarEvent = async function (request) {
  try {
    let data = request.body;
    let emailsData = [];
    let workflowTasks = await TransactionWorkflow.getModel(request.headers["subdomain"]).findOne({ transactionId: request.query.transactionId }, { tasks: 1, _id: 0 });
    let task = workflowTasks.tasks.find(a => a._id == request.query.taskId);

    let userIds = await configurationManager.getUsersIds((request.headers["subdomain"]), request.query.transactionId, request.query.taskId);
    let users = userIds.map(async userId => {
      let user = await ClientUser.getModel((request.headers["subdomain"])).findOne({ _id: userId })
      let detailObj = {};
      detailObj['userId'] = user._id;
      if (user.head == true) {
        detailObj['name'] = request.headers["subdomain"] + '(Admin)';
      }
      else {
        detailObj['name'] = user.firstName + ' ' + user.lastName;
      }
      detailObj['status'] = '-';
      detailObj['declineReason'] = '-';
      let emailObj = {
        name: detailObj['name'],
        email: user.email
      }
      emailsData.push(emailObj)
      return detailObj;
    });
    data.users = await Promise.all(users);
    // console.log('usersEmail...',emailsData);

    let obj = {};
    obj['tasks.' + task.position + '.FormData'] = data;
    await TransactionWorkflow.getModel(request.headers["subdomain"]).update(
      { transactionId: request.query.transactionId },
      {
        $set: obj
      }
    );
    let answer = false;
    let replyData = {
      answer: answer,
      loggedUser: request.query.loggedUser,
    }
    await createICalendar(data, task.action)
    await this.emailCalendarTaskUsers(request.headers["subdomain"], request.query.transactionId, request.query.taskId, emailsData, task.action)
    await this.notifyTaskSubmitted(request.headers["subdomain"], request.query.transactionId, request.query.taskId, replyData)
    return {
      code: 200,
      data: { message: 'calendarForm event is successfully created' }
    };
  } catch (error) {
    console.log('error', error);

    Logger.log(
      "An error occurred while creating event in calendarForm" +
      error,
      "saveCalendarEvent"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.getCalendarEvent = async function (request) {
  try {
    let Task = await getTaskById(request.headers["subdomain"], request.query.transactionId, request.query.taskId)
    let formData = Task.FormData;
    return {
      code: 200,
      data: { formData: formData }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while getting the createdEvent against the task" +
      error,
      "getCalendarEvent"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.updateUserStatus = async function (request) {
  try {
    let data = request.body
    let workflowTasks = await TransactionWorkflow.getModel(request.headers["subdomain"]).findOne({ transactionId: request.query.transactionId }, { tasks: 1, _id: 0 });
    let task = workflowTasks.tasks.find(a => a._id == request.query.taskId);
    let userIndex = -1, idx = -1;

    /* TODO:- need to modified index value find */
    task.FormData.users.forEach(x => {
      idx++;
      if (x.userId == data.loggedUser) {
        userIndex = idx;
      }
    })
    let obj = {};
    obj['tasks.' + task.position + '.FormData' + '.users.' + userIndex + '.status'] = data.status;
    obj['tasks.' + task.position + '.FormData' + '.users.' + userIndex + '.declineReason'] = data.declineDescription;

    await TransactionWorkflow.getModel(request.headers["subdomain"]).update(
      { transactionId: request.query.transactionId },
      {
        $set: obj
      }
    );

    /* TODO :- have to do notification */
    let answer = true;
    let replyData = {
      answer: answer,
      status: data.status,
      loggedUser: request.body.loggedUser,
      loggedUserName: request.body.loggedUserName
    }
    await this.notifyTaskSubmitted(request.headers["subdomain"], request.query.transactionId, request.query.taskId, replyData)
    return {
      code: 200,
      data: { message: 'user Status is successfully updated' }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating contact status in calendarForm" +
      error,
      "updateUserStatus"
    );
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }

}


module.exports.addNewTransactionContact = async function (contact, transactionId, subdomain) {
  try {
    let isArray = Array.isArray(contact);
    if (!isArray) {
      /**
     * Check if the role is unque for each transaction.
     */
      if (!await transactionHasUniqueRole(contact.role.id, transactionId, subdomain)) {
        return { code: 400, data: { message: 'The role is already used on this transaction. Please choose a new role.' } }
      }

      await saveContactDetails([contact], transactionId, subdomain, isArray)
    } else {
      await saveContactDetails(contact, transactionId, subdomain, isArray)
    }
    return { code: 200, data: { message: 'Contact added successfully.' } }

  } catch (error) {

    return { code: 500, message: ResponseMessages.TryLater }
  }
}

async function saveContactDetails(contacts, transactionId, subdomain, isArray) {
  let ContactModel = Contact.getModel(subdomain);
  let TransactionModel = Transaction.getModel(subdomain);

  let promiseFulfillment = contacts.map(async (contact) => {
    let duplicate;
    if (contact.contactType == 'Individual') {
      duplicate = await ContactModel.findOne({ 'role.id': contact.role.id, 'persons.email': contact.persons[0].email });
    } else {

      duplicate = await ContactModel.findOne({ 'role.id': contact.role.id, email: contact.email, 'persons.0.email': contact.persons[0].email });
    }
    let contactInfo;
    if (!duplicate) {
      let initialized = new ContactModel(contact);
      contactInfo = await initialized.save();
      if (!isArray) {
        await module.exports.inviteUsers({ userEmails: contactInfo.persons.map(person => person.email), transactionId: transactionId, taskId: null }, subdomain)
      }
    }
    await TransactionModel.updateOne({ _id: transactionId }, { $addToSet: { contacts: !duplicate ? contactInfo._id : duplicate._id } })
  })
  await Promise.all(promiseFulfillment);
  return;
}




module.exports.getExistingTransactionContacts = async function (transactionId, subdomain) {
  try {
    let ContactModel = Contact.getModel(subdomain);
    //The existing contacts on the transaction.
    let transaction = await Transaction.getModel(subdomain).findOne({ _id: transactionId }, { contacts: 1 });
    // The reusable contacts in contacts collection.
    let existingContacts = await ContactModel.find({ reusable: true });

    /**
     * Filter out the contacts from existing where there are no contacts from transaction.
     * Next, filter out those contacts from existing whose role are already used on the transaction.
     */

    existingContacts = existingContacts.filter(eC => transaction.contacts.indexOf(eC._id) == -1);
    existingContacts.filter(eC => transactionHasUniqueRole(eC.role.id, transactionId, subdomain));

    return { code: 200, data: existingContacts }
  } catch (error) {
    Logger.log('Error while fetching existing transaction contacts.', error, 'getExistingTransactionContacts')
    return { code: 500, message: ResponseMessages.TryLater }
  }
}


async function transactionHasUniqueRole(roleId, transactionId, subdomain) {
  let ContactModel = Contact.getModel(subdomain);
  let transaction = await Transaction.getModel(subdomain).findOne({ _id: transactionId }, { contacts: 1 });
  let verificationPromise = transaction.contacts.map(async (contactId) => {
    let contact = await ContactModel.findOne({ _id: contactId });
    return contact;
  });
  let contacts = await Promise.all(verificationPromise);
  return contacts.find(contact => {
    return contact.role.id == roleId
  }) ? false : true
}


module.exports.getDataSet = async function (request) {
  try {
    let workflow = await TransactionWorkflow.getModel(request.headers["subdomain"]).findOne({ transactionId: request.query.transactionId }, { tasks: 1, _id: 0 })
    let taskFormData = workflow.tasks.map(async (task) => {
      if (task.FormData) {
        return {
          type: task.componentType, title: task.title, formId: task.formId,
          formData: task.FormData
        }
      } else {
        return null;
      }
    });
    let formData = await Promise.all(taskFormData);
    let filterFormData = formData.filter(a => a != null);
    return {
      code: 200,
      data: { formData: filterFormData.length > 0 ? filterFormData : [] }
    };
  } catch (error) {
    Logger.log('Error while fetching transaction Log.', error, 'TransactionLog')
    return { code: 500, message: ResponseMessages.TryLater }
  }
}
