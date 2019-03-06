const Task = require("../models/client/huddle/settings/task");
const Role = require("../models/client/userManagement/role");
const fs = require("fs");
const ContactTypesJSON = require('../models/client/common/contactTypes').contactTypeJson;
const NotificationTypesJSON = require('../models/client/common/notificationTypes').notificationTypeJson;
const NotificationSetting = require("../models/client/huddle/settings/notificationSetting");
const Transaction = require("../models/client/huddle/transaction");
const ClosingTeam = require("../models/client/huddle/settings/closingTeam")
const User = require("../models/client/userManagement/user");
// setup huddle Configuration only when user has susbcribed for Huddle.
// In future, Add more configuration as per need.
module.exports.setupHuddleConfigurationData = async function (subdomain) {
  return new Promise((resolve, reject) => {
    let TaskModel = Task.getModel(subdomain);
    let RoleModel = Role.getModel(subdomain);
    let counter = 0;
    fs.readFile("seed/task/task.json", "utf8", async function (error, data) {
      if (error) reject(error);
      let predefinedTask = JSON.parse(data);
      for (let i = 0; i < predefinedTask.length; i++) {
        let contacts = await predefinedTask[i].contacts.map(async function (obj) {
          let role = await RoleModel.findOne({ name: obj.roleName });
          let rObj = {};
          rObj['roleId'] = role._id;
          rObj['roleName'] = obj.roleName;
          return rObj;
        })
        predefinedTask[i]['contacts'] = await Promise.all(contacts)
        let element = new TaskModel(predefinedTask[i]);
        element.save((er, result) => {
          if (er) reject(er);
          counter++;
          if (counter === predefinedTask.length) {
            resolve({
              code: 200,
              message: "Added all predefined task"
            });
          }
        });
      }
    });
  });
};

/**
 * Seed the system roles to client's db.
 */
module.exports.setSystemRoles = async function (subdomain) {
  let RoleModel = Role.getModel(subdomain);
  let promise = ContactTypesJSON.map(contactType => {
    let role = new RoleModel(contactType)
    return role.save()
  })
  await Promise.all(promise)
  return {};
}



/**
 * Seed the notification types to client's db.
 */
module.exports.setNotificationType = async function (subdomain) {
  let NotificationModel = NotificationSetting.getModel(subdomain);
  let promise = NotificationTypesJSON.map(notificationObj => {
    let notification = new NotificationModel(notificationObj)
    return notification.save()
  })
  await Promise.all(promise)
  return {};
}

module.exports.getClosingDetailByDate = async function (request) {
  closingTeamArray = [];
  let subdomain = request.headers['subdomain'];
  //to get All Closing Schedules of particular date from On going Transactions
  try {
    // Find all closing team which is set by admin
    let closingTeam = await ClosingTeam.getModel(subdomain).findOne({});

    if (closingTeam) {
      //if closing team exists get the all future closing transaction with their embeded contacts
      let futureClosings = await Transaction.getModel(subdomain).aggregate([
        {
          $lookup: {
            from: "contacts",
            localField: "contacts",
            foreignField: "_id",
            as: "contacts"
          }
        },
        {
          $match: {
            closingDate: {
              $gte: new Date(request.query.selectedDate)
            }
          }
        },
      ]);
      // if future Closing exists then map the future closing with closing team eith their profile if exist or registered
      if (futureClosings.length > 0) {
        let ClosingTeamInformation = futureClosings.map(async (transaction) => {

          let closingMembers = closingTeam.members.map(async (member) => {
            let contact = transaction.contacts.find(a => a.role.id.toString() === member.roleId.toString());
            if (contact) {
              let ContactUser = await User.getModel(subdomain).findOne({ email: contact.persons[0].email });
              return { contact: contact, profileDetail: ContactUser ? ContactUser : null, memberDetail: member }
            } else {
              return { contact: null, profileDetail: null, memberDetail: member }
            }

          })
          let filteredClosingTeam = await Promise.all(closingMembers);
          return {
            id: transaction.numberDescriptor.prefix + transaction.numberDescriptor.number + transaction.numberDescriptor.suffix,
            address: transaction.closingLocation ? transaction.closingLocation : null,
            closingTeam: filteredClosingTeam,
            closingDate: transaction.closingDate,
            closingTime: transaction.closingTime
          };

        });
        closingTeamArray = await Promise.all(ClosingTeamInformation);
      }
    }
    return {
      code: 200,
      data: closingTeamArray
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }
}