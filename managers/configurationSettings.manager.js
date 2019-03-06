const ClosingLocation = require("../models/client/huddle/settings/closingLocation");
const NotificationSetting = require("../models/client/huddle/settings/notificationSetting");
const form = require("../models/client/huddle/settings/form");
const ResponseMessages = require("../util/responseMessages");
const Task = require("../models/client/huddle/settings/task");
const User = require("../models/client/userManagement/user");
const ClientInfo = require("../models/client/userManagement/clientInfo");
const Client = require("../models/product/client");
const TransactionNumber = require("../models/client/huddle/settings/transactionNumberDescriptor");
const DocumentManager = require("./document.manager");
const Logger = require("../config/logger");
const bcrypt = require("bcrypt");
const Role = require("../models/client/userManagement/role");
const userGroup = require("../models/client/userManagement/userGroup");
const Workflow = require("../models/client/huddle/settings/workFlow");
const message = "An error occurred. Please try again after sometime.";
const Formbuilder = require("../models/client/huddle/settings/formbuilder");
const StateCounty = require("../models/client/common/county");
const AllStateCounty = require("../models/product/state");
let Transaction = require("../models/client/huddle/transaction");
const notification = require("../notifications/redisNotificationChannels");
const TransactionWorkflow = require("../models/client/huddle/transactionWorkFlow");
const Contact = require("../models/client/common/contact");
const ClosingTeam = require('../models/client/huddle/settings/closingTeam')

var moment = require('moment');

module.exports.getClosingLocations = async function (request) {
  //to fetch Added closing location from client's DB 
  try {
    let result = await ClosingLocation.getModel(request.headers["subdomain"]).find()
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.updateClosingLocation = async function (request) {
  //to update added closing location 
  try {
    let closingLocationModel = ClosingLocation.getModel(
      request.headers["subdomain"]
    );
    await closingLocationModel.updateOne(
      { _id: request.body._id },
      { $set: request.body }
    );
    return {
      code: 200,
      data: { message: "Closing Location updated successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.addClosingLocation = async function (body, subdomain) {
  try {
    let closingLocationModel = ClosingLocation.getModel(subdomain);
    let locationSetUp = new closingLocationModel(body);
    await locationSetUp.save();
    return {
      code: 200,
      data: { message: "Closing location added successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.deleteClosingLocation = async function (request) {
  // delete selected State County from configured state county list in clients db
  try {
    let closingLocation = ClosingLocation.getModel(request.headers["subdomain"]);
    await closingLocation.deleteOne({
      _id: request.query.id
    });
    return {
      code: 200,
      data: { message: "Closing Location deleted successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.getClosingLocationById = async function (request) {
  //  get one configured state and counties to edit 
  try {
    let query = { _id: request.query.id };
    let result = await ClosingLocation.getModel(
      request.headers["subdomain"]
    ).findOne(query);
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: "No data found"
    };
  }
};

module.exports.listRoles = async function (request) {
  try {
    let result = await Role.getModel(request.headers["subdomain"]).find();
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.addRole = async function (request) {
  console.log(JSON.stringify(request.body));
  try {
    let roleModel = Role.getModel(request.headers["subdomain"]);
    let role = await roleModel.findOne({ name: request.body.name });
    if (role) {
      return {
        code: 500,
        message: "This Role already exists"
      };
    }
    let roleObjData = new roleModel(request.body);
    let roleData = await roleObjData.save();
    return {
      code: 200,
      data: { role: roleData, message: "Role added successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.updateRole = async function (request) {
  try {
    await Role.getModel(request.headers["subdomain"]).updateOne(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      data: { message: "Role updated Successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.deleteRole = async function (request) {
  try {
    let roleModel = Role.getModel(request.headers["subdomain"]);
    await roleModel.remove({
      _id: request.params.id
    });
    return {
      code: 200,
      data: { message: "Role deleted successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.getRole = async function (request) {
  // list all roles from the role collection
  try {
    let query = { _id: request.query.id };
    let result = await Role
      .getModel(request.headers["subdomain"])
      .findOne(query);
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: "No data found"
    };
  }
};

module.exports.getUserGroups = async function (request) {
  try {
    let result = await userGroup.getModel(request.headers["subdomain"]).find();
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.createUserGroup = async function (data, subdomain) {
  try {
    let UserGroupModel = userGroup.getModel(subdomain);
    let initialized = new UserGroupModel(data)
    let newGroup = await initialized.save();

    let UserModel = User.getModel(subdomain);

    // Set the group id back to users collection
    let promise = data.users.map((userId) => {
      return UserModel.updateOne({ _id: userId }, { $push: { userGroups: newGroup._id } })
    })
    await Promise.all(promise);
    return { code: 200, data: { message: ResponseMessages.GroupCreationSuccessMessage } }
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
}

module.exports.getUserGroupById = async function (id, subdomain) {
  try {
    let data = await userGroup.getModel(subdomain).findOne({ _id: id });
    return { code: 200, data: data }
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
}

module.exports.updateUserGroup = async function (data, subdomain) {
  try {
    let userGroupModel = userGroup.getModel(subdomain);
    let groupId = data._id;
    delete data._id;

    /**
     * Filter out the Old, New and Deleted user ids
     * so as to manipulate user group and each user's group id.
     */
    let groupInfo = await userGroupModel.findOne({ _id: groupId });
    let excludedUsers = [], newUsers = [], oldUsers = [];
    groupInfo.users.forEach(userId => {
      if (!!data.users.find(user => user == userId)) {
        oldUsers.push(userId)
      } else {
        excludedUsers.push(userId)
      }
    })
    data.users.forEach(userId => {
      if (!groupInfo.users.find(user => user == userId)) {
        newUsers.push(userId)
      }
    })

    if (newUsers.length > 0) {
      let UserModel = User.getModel(subdomain);
      let promise = newUsers.map((userId) => {
        return UserModel.updateOne({ _id: userId }, { $push: { userGroups: groupId } })
      })
      await Promise.all(promise);
    }

    newUsers = newUsers.concat(oldUsers);

    if (excludedUsers.length > 0) {
      await pullGroupIdsFromUsers(excludedUsers, groupId, subdomain)
    }
    await userGroupModel.updateOne({ _id: groupId }, { $set: { users: newUsers, name: data.name, views: data.views } })
    return { code: 200, data: { message: ResponseMessages.GroupUpdateSuccessMessage } }
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
}

async function pullGroupIdsFromUsers(userIds, groupId, subdomain) {
  let UserModel = User.getModel(subdomain);
  let promise = userIds.map(id => {
    return UserModel.updateOne({ _id: id }, { $pull: { userGroups: groupId } })
  })
  await Promise.all(promise);
  return true;
}

module.exports.deleteUserGroup = async function (id, subdomain) {
  try {
    let UserGroupModel = userGroup.getModel(subdomain);
    let groupInfo = await UserGroupModel.findOne({ _id: id });
    await UserGroupModel.deleteOne({ _id: id });
    await pullGroupIdsFromUsers(groupInfo.users, id, subdomain)
    return { code: 200, data: { message: ResponseMessages.GroupDeletionSuccess } }
  } catch (error) {
    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
}

module.exports.updateAccessRight = async function (request) {
  try {
    let Modeltype =
      request.query.type == "Role"
        ? Role
        : request.query.type == "User"
          ? User
          : userGroup;
    let data = await Modeltype.getModel(request.headers["subdomain"]);
    await data.updateOne(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      data: { message: "Access Right updated Successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.addForm = function (request) {
  return new Promise((resolve, reject) => {
    // make use of form.
    let formModel = form.getModel(request["subdomain"]);
    formModel
      .save(request.body)
      .then(
        resolve({
          code: 200
          // create a response message for adding form
          //message: ResponseMessages.
        })
      )
      .error(
        reject({
          code: 500,
          message: ResponseMessages.AddClosingLocationError
        })
      );
  });
};

module.exports.getForms = function (request) {
  // get reference of the forms and list all forms
};

module.exports.deleteForm = function (request) {
  // forms can be deleted only if not referenced by any transactions or workflow.
};

module.exports.updateUser = async function (userJson, subdomain, passwordEncryption, query) {
  try {
    userJson = userJson[0];
    if (userJson.imageDeleted) {
      await DocumentManager.deleteRemoteFile(userJson.oldImageInfo);
    }
    delete userJson._id;

    if (userJson.portalDetailUpdate) {
      await Client.getModel().updateOne(
        { email: userJson.email },
        { $set: userJson }
      );
      await ClientInfo.getModel(subdomain).updateOne(
        { email: userJson.email },
        { $set: userJson }
      );
    } else {
      if (passwordEncryption) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(userJson.password, salt);
        userJson.password = hash;
      }
      console.log(userJson);
      await User.getModel(subdomain).updateOne(
        { email: userJson.email },
        { $set: userJson }
      );
    }

    if (query && JSON.parse(query.taskId) != null) {
      let transaction = await Transaction.getModel(subdomain).findOne({ _id: query.transactionId }, { number: 1, _id: 0 })
      let userIds = await this.getUsersIds(subdomain, query.transactionId, query.taskId);
      if (userIds.length > 0) {
        notification.UserRegistered(subdomain, userJson.firstName, query.transactionId, transaction.number, query.taskId, userIds)
      }
    }
    return {
      code: 200,
      data: { message: ResponseMessages.ProfileUpdateSuccess, duplicates: [] }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating user profile on : " + subdomain,
      error,
      "updateUser"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.addUsers = async function (userJson, subdomain) {
  try {
    /**
     * Execute an asynchronous process for validating each of the emails.
     * Filter the duplicates and insert the valid ones.
     */
    let UserModel = User.getModel(subdomain);
    const task1 = userJson.map(
      async val => await UserModel.findOne({ email: val.email })
    );
    let data = await Promise.all(task1);
    let duplicates = data.filter(val => val != null);
    for (let i = 0; i < duplicates.length; i++) {
      userJson = userJson.filter(a => a.email !== duplicates[i].email);
    }
    //
    duplicates = duplicates.map(val => {
      return {
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email
      };
    });

    // Insert the unique type users
    const task2 = userJson.map(async element => {
      let userObj = new UserModel(element);
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(
        element.password ? element.password : "password",
        salt
      );
      userObj.password = hash;
      userObj.isSystemUser =true;
      await userObj.save();
      return;
    });
    await Promise.all(task2);
    return {
      code: 200,
      data: { message: ResponseMessages.UserRegistered, duplicates: duplicates }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while adding users to : " + subdomain,
      error,
      "addUser"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

// SP : Need to put some conditions later on for fetching the users here.
module.exports.listUsers = async function (getSpecific, subdomain) {
  try {
    Role.getModel(subdomain);
    let users = [];
    if (getSpecific) {
      users = await User.getModel(subdomain).find(
        { head: { $ne: true }, isSystemUser: true },
        {
          firstName: 1, lastName: 1
        }
      )
    } else {
      users = await User.getModel(subdomain).aggregate([
        { $match: { head: { $ne: true }, isSystemUser: true } },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "roles"
          }
        }
      ]);
    }
    return { code: 200, data: { users: users } };
  } catch (error) {
    return { code: 500, data: { message: ResponseMessages.TryLater } };
  }
};

module.exports.getUserById = async function (id, subdomain) {
  try {
    let user = await User.getModel(subdomain).findOne({ _id: id });
    return { code: 200, data: user };
  } catch (error) {
    Logger.log("Error while fetching user by id", error, "getUserById");
    return { code: 500, data: { message: ResponseMessages.TryLater } };
  }
};

module.exports.deleteTask = async function (request) {
  try {
    let TaskModel = Task.getModel(request.headers["subdomain"]);
    await TaskModel.deleteOne({
      _id: request.query.taskId
    });
    return {
      code: 200,
      message: "Task deleted successfully."
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.getTasks = async function (request) {
  let query = request.query.taskId ? { _id: request.query.taskId } : {};
  // list all tasks from the task collection
  try {
    let tasks = await Task.getModel(request.headers["subdomain"]).find(query);
    return {
      code: 200,
      data: { tasks: request.query.taskId ? tasks[0] : tasks }
    };
  } catch (error) {
    return { code: 500, data: ResponseMessages.TryLater };
  }
};

module.exports.getTaskByComponentType = async function (request) {
  try {
    // Define search query object.
    let input = request.query;
    let query = {};
    let searchStringQuery = { $regex: input.searchString, $options: "i" };
    if (input.componentType) {
      query = input.searchString
        ? input.componentType == "All"
          ? {
            componentType: { $ne: "PredefinedForm" },
            title: searchStringQuery
          }
          : { componentType: input.componentType, title: searchStringQuery }
        : input.componentType == "All"
          ? {
            componentType: { $ne: "PredefinedForm" }
          }
          : { componentType: input.componentType };
    } else if (input.searchString) {
      query = { title: searchStringQuery };
    }
    let sort = input.componentType == 'PredefinedForm' ? { position: 1 } : { _id: -1 };
    console.log(query, sort);
    let searchedData = await Task.getModel(
      request.headers["subdomain"]
    ).paginate(query, {
      page: parseInt(input.page),
      limit: parseInt(input.limit),
      sort: sort
    });

    return { code: 200, tasks: searchedData ? searchedData : [] };
  } catch (error) {
    Logger.log(
      "An error occurred while listing Task : " + request.headers["subdomain"],
      error,
      "getTaskByComponentType"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.addTask = async function (request) {
  // list all tasks from the task collection
  try {
    let TaskModel = Task.getModel(request.headers["subdomain"]);
    let task = new TaskModel(request.body);
    await task.save();
    return {
      code: 200,
      data: { message: "Task added successfully." }
    };
  } catch (error) {
    return { code: 500, data: ResponseMessages.TryLater };
  }
};

module.exports.updateTask = async function (request) {
  try {
    let TaskModel = Task.getModel(request.headers["subdomain"]);
    await TaskModel.updateOne(
      { _id: request.query.taskId },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      data: { message: "Task updated successfully." }
    };
  } catch (error) {
    return { code: 500, data: ResponseMessages.TryLater };
  }
};

module.exports.saveWorkflow = async function (request) {
  try {
    let workFlowModel = Workflow.getModel(request.headers["subdomain"]);
    let workflow = await new workFlowModel(request.body);
    await workflow.save();
    return {
      code: 200,
      data: {
        message: "Workflow created successfully."
      }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.getWorkflows = async function (request) {

  let query = request.query.workflowID ? { _id: request.query.workflowID } : {};
  try {

    let data = await Workflow.getModel(request.headers["subdomain"]).aggregate([
      {
        $lookup: {
          from: "users",
          localField: "lastModifiedBy",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          lastModifiedByName: "$user.name",
          lastModifiedBy: 1,
          createdDate: 1,
          tasks: 1,
          description: 1,
          title: 1,
          createdBy: 1,
          lastModifiedDate: 1
        }
      }
    ]);

    return {
      code: 200,
      data: {
        workflows: request.query.workflowID ? data[0] : data
      }
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.updateWorkflow = async function (request) {
  try {
    let workFlowModel = Workflow.getModel(request.headers["subdomain"]);
    await workFlowModel.updateOne(
      { _id: request.query.workflowId },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      data: { message: "Workflow updated successfully." }
    };
  } catch (error) {
    return { code: 500, data: ResponseMessages.TryLater };
  }
};

module.exports.deleteWorkflow = async function (request) {
  try {
    let workFlowModel = Workflow.getModel(request.headers["subdomain"]);
    await workFlowModel.deleteOne({
      _id: request.query.workflowId
    });
    return {
      code: 200,
      message: "Workflow deleted successfully."
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

module.exports.listCustomizedForms = async function (request) {
  try {
    let listForms = await Formbuilder.getModel(
      request.headers["subdomain"]
    ).find();
    return { code: 200, data: listForms };
  } catch (error) {
    return { code: 500, message: message };
  }
};

module.exports.deleteFormbuilderorms = async function (id, subdomain) {
  try {
    let FormbuilderModel = Formbuilder.getModel(subdomain);
    await FormbuilderModel.remove({
      _id: id
    });
    return {
      code: 200,
      message: "Forms deleted successfully."
    };
  } catch (error) {
    return {
      code: 500,
      message: message
    };
  }
};

//FormBuilder
module.exports.createForm = async function (request) {
  try {
    let FormBuilderModel = Formbuilder.getModel(request.headers["subdomain"]);
    let formbuilderData = new FormBuilderModel(request.body);
    await formbuilderData.save();
    return {
      code: 200,
      message: "Form is created successfully."
    };
  } catch (error) {
    return {
      code: 500,
      message: "An error occurred. Please try after sometime."
    };
  }
};

module.exports.getFormbuilderFormById = async function (id, subdomain) {
  try {
    let form = await Formbuilder.getModel(subdomain).findOne({ _id: id });
    return { code: 200, data: form };
  } catch (error) {
    return { code: 500, data: { message: ResponseMessages.TryLater } };
  }
};

module.exports.editFormBuilderForm = async function (request) {
  try {
    let FormbuilderModel = Formbuilder.getModel(request.headers["subdomain"]);
    await FormbuilderModel.update(
      {
        _id: request.params.id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      message: "Form updated Successflly"
    };
  } catch (error) {
    console.log(error);

    return {
      code: 500,
      message: "An error occurred. Please try after sometime."
    };
  }
};

module.exports.getTransactionNumber = async function (request) {
  try {
    let transactionNumber = await TransactionNumber.getModel(
      request.headers["subdomain"]
    ).findOne({});
    return { code: 200, data: { transactionNumber: transactionNumber } };
  } catch (error) {
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.saveTransactionNumber = async function (request) {
  try {
    let TransactionNumberModel = await TransactionNumber.getModel(
      request.headers["subdomain"]
    );
    let transactionNumber = new TransactionNumberModel(request.body);
    transactionNumber.save();
    return {
      code: 200,
      data: { message: "Transaction number saved successfully." }
    };
  } catch (error) {
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.updateTransactionNumber = async function (request) {
  try {
    let TransactionNumberModel = await TransactionNumber.getModel(
      request.headers["subdomain"]
    );
    await TransactionNumberModel.updateOne(
      { _id: request.query.transactionNumberId },
      { $set: request.body }
    );
    return {
      code: 200,
      data: { message: "Transaction number updated successfully." }
    };
  } catch (error) {
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.configureStateCounty = async function (request) {
  // configure a state countyfor a particular client.
  try {
    let StateCountyModel = StateCounty.getModel(request.headers["subdomain"]);
    let stateCountySetUp = new StateCountyModel(request.body);
    await stateCountySetUp.save();
    return {
      code: 200,
      data: { message: "State/Counties Successfully Configured" }
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.getConfiguredStates = async function (request) {
  // to get list of all configured states
  try {
    let configuredStates = await StateCounty.getModel(
      request.headers["subdomain"]
    ).find({}, { state: 1, _id: 0 });
    return {
      code: 200,
      data: configuredStates
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.getAllStatesCounties = async function (request) {
  //to get list of each state and counties from admin's DB
  try {
    let result = await AllStateCounty.getModel().find();
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.getAllConfiguredStatesCounties = async function (request) {
  //to get list of configured State/Counties from clients dB
  try {
    let result = await StateCounty.getModel(
      request.headers["subdomain"]
    ).find();
    // console.log(request.headers["subdomain"]);

    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
};

module.exports.deleteSelectedStateCounty = async function (request) {
  // delete selected State County from configured state county list in clients db
  try {
    let stateCounty = StateCounty.getModel(request.headers["subdomain"]);
    await stateCounty.remove({
      _id: request.query.id
    });
    return {
      code: 200,
      data: { message: "State and Counties deleted successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.removeSelectedCounty = async function (request) {
  // delete selected  County from configured state county list in clients db
  try {
    let stateCounty = StateCounty.getModel(request.headers["subdomain"]);
    await stateCounty.update(
      {
        _id: request.query.id
      },
      { $pull: { county: request.query.county } }
    );
    return {
      code: 200,
      data: { message: "County deleted successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};

module.exports.getEditItemDetail = async function (request) {
  //  get one configured state and counties to edit 
  try {
    let query = { _id: request.query.id };
    let result = await StateCounty.getModel(
      request.headers["subdomain"]
    ).findOne(query);
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: "No data found"
    };
  }
};

module.exports.updateStateCounties = async function (request) {
  //to update configured state/counties  
  try {
    await StateCounty.getModel(request.headers["subdomain"]).update(
      { _id: request.body._id },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      data: { message: "State/Counties updated successfully." }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Some error occured, please try later."
    };
  }
};


module.exports.addClosingSchedule = async function (request) {
  //to insert a closing schedule in client's DB
  let input = request.body.closingSchedule
  let subdomain = request.headers["subdomain"]
  try {

    await Transaction.getModel(subdomain).updateOne(
      { _id: request.body.transactionId },
      {
        closingDate: input.date,
        closingTime: input.time,
        closingLocation: input.address
      }
    );
    let transaction = await Transaction.getModel(subdomain).findOne({ _id: request.body.transactionId }, { number: 1, _id: 0 })
    let userIds = await this.getUsersIds(subdomain, request.body.transactionId, request.body.taskId)
    if (userIds.length > 0) {
      let closingDateTime = moment(input.date).format("MMM DD YYYY") + " " + input.time.hh + ':' + input.time.mm + ':' + input.time.ss + ' ' + input.time.a;
      let closingLocation = getClosingLocationSummary(input.address);
      notification.ClosingScheduled(subdomain, transaction.number, request.body.transactionId, closingDateTime, closingLocation, request.body.taskId, userIds)
    }
    return {
      code: 200,
      data: { message: "Closing Scheduled Successfully" }
    };
  } catch (error) {
    console.log(error);

    return {
      code: 500,
      message: ResponseMessages.TryLater
    };
  }
};

// REF
module.exports.getUsersIds = async function (subdomain, transactionId, taskId) {

  let userIds = [];
  let workflowTasks = await TransactionWorkflow.getModel(subdomain).findOne({ transactionId: transactionId }, { tasks: 1, _id: 0 });
  let task = workflowTasks.tasks.find(a => a._id == taskId);
  let roleIds = task.contacts.map(contact => contact.roleId);
  let ContactModel = Contact.getModel(subdomain);
  let UserModel = User.getModel(subdomain);
  let userFetchPromise = roleIds.map(async (roleId) => {
    let contact = await ContactModel.findOne({ 'role.id': roleId });
    let user = null
    if (contact) {
      user = await UserModel.findOne({ email: contact.persons[0].email });
    }
    return user ? user._id : null;
  });
  let users = await Promise.all(userFetchPromise);
  users.forEach(element => {
    if (element)
      userIds.push(element);
  });
  // if the assignedBy user is available then first check its in task contacts if it is not available then push that id in return collection of ids
  if (!!task.assignedBy) {
    let assignedByUser = userIds.find(a => a == task.assignedBy.toString());
    if (!assignedByUser) {
      userIds.push(task.assignedBy)
    }
  }
  return userIds;
}

function getClosingLocationSummary(closingLocation) {
  let summary = ''
  for (const field in closingLocation) {
    if (closingLocation.hasOwnProperty(field)) {
      const element = closingLocation[field];
      if (element != undefined && element != null && element != ' ') {
        summary = summary != '' ? summary + ',' + element : element
      }
    }
  }
  return summary;
}

module.exports.getNotificationSetting = async function (request) {
  try {
    let notification = await NotificationSetting.getModel(request.headers["subdomain"]).find({});
    return {
      code: 200,
      data: notification
    };
  } catch (error) {
    return {
      code: 500,
      message: "No data found"
    };
  }
};


module.exports.updateNotificationSetting = async function (request) {
  let notificationModel = NotificationSetting.getModel(request.headers["subdomain"])
  try {
    request.body.forEach(async (notification) => {
      await notificationModel.updateOne(
        { _id: notification._id },
        {
          $set: notification
        }
      );
    });
    return {
      code: 200,
      data: { message: "Notification updated successfully" }
    };
  } catch (error) {
    console.log(error);

    return {
      code: 500,
      message: "No data found"
    };
  }
};

module.exports.getClosingTeam = async function (subdomain) {
  try {
    let ClosingTeamModel = ClosingTeam.getModel(subdomain);
    let data = await ClosingTeamModel.find();
    return { code: 200, data: data.length > 0 ? data[0].members : [] }
  } catch (error) {
    return { status: 500, message: ResponseMessages.TryLater }
  }
}

module.exports.updateClosingTeam = async function (body, subdomain) {
  try {
    let ClosingTeamModel = ClosingTeam.getModel(subdomain);
    await ClosingTeamModel.updateMany({}, {
      $set: { members: body }
    }, { upsert: true })
    return { code: 200, data: { message: 'Closing team updated successfully.' } }
  } catch (error) {
    console.log(error)
    return { status: 500, message: ResponseMessages.TryLater }
  }
}