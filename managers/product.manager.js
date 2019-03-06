const User = require("../models/client/userManagement/user");
const bcrypt = require("bcrypt");
const ResponseMessages = require("../util/responseMessages");
const Logger = require("../config/logger");
const Client = require("../models/product/client");
const ClientInfo = require("../models/client/userManagement/clientInfo");
const DocumentManager = require("../managers/document.manager");
const Lead = require("../models/product/lead");
const PortalManager = require("../managers/portal.manager");
const EmailSubscription = require("../models/product/subscribeEmail");
const Configs = require("../models/client/netsheet/enumTypes");
const Role = require("../models/client/userManagement/role");


async function checkDuplicateFields(email, subdomain) {
  let firstField = await Client.getModel().findOne({ email: email });
  let secondField = await Client.getModel().findOne({ subdomain: subdomain });
  return {
    emailExists: firstField ? true : false,
    subdomainExists: secondField ? true : false
  };
}

async function flushAdministrativeRoles(subdomain) {
  let role = {
    name: "admin",
    description: "",
    defaultView: "SummaryDashboard",
    views: [
      {
        view: "SummaryDashboard",
        viewParts: [
          {
            name: "TransactionSummary",
            actions: ["All"],
            viewParts: []
          }
        ],
        actions: ["All"]
      }
    ]
  };

  let roleModel = Role.getModel(subdomain);
  let adminRoleObj = new roleModel(role);
  let admin = await adminRoleObj.save();

  role.name = "superAdmin";
  let superadminRoleObj = new roleModel(role);
  let superadmin = await superadminRoleObj.save();
  return { adminRoleId: admin._id, superAdminRoleId: superadmin._id };
}

module.exports.registerClient = async function (userJson) {

  // Step 1: Upload logo.
  // Step 2: Check for duplicate entry.
  // Step 3: Add client information to the TTD DB
  // Step 4: Make entry in ClientInfo to the client db.
  // Step 5: Flush administrative Roles.
  // Step 6: Make an entry of the client admin user.
  // Step 7: Make an entry of the superadmin user.

  try {
    let jsonData = userJson[0]
    // Step 1: Upload logo.
    // let FileDetails = await DocumentManager.uploadFile(request, "image", "Logos");
    // let jsonData = JSON.parse(request.body.jsonObject);
    // Step 2: Check for duplicate entry.
    let duplicates = await checkDuplicateFields(
      jsonData.email,
      jsonData.subdomain
    );

    if (!duplicates.emailExists && !duplicates.subdomainExists) {
      // Step 3: Add client information to the TTD DB
      let ClientModel = Client.getModel();

      let clientObj = (({ fullName, region, email, address, subdomain, imageInfo }) => ({
        fullName,
        region,
        email,
        address,
        subdomain,
        imageInfo, 
      }))(jsonData);
      clientObj.createdOn = new Date();

      clientObj.subscribed = false;
      let client = new ClientModel(clientObj);
      await client.save();

      // Step 4: Make entry in ClientInfo to the client db.
      let clientInfoModel = ClientInfo.getModel(clientObj.subdomain);
      clientObj = (({
        fullName,
        region,
        email, 
        subdomain,
        imageInfo
      }) => ({ fullName, region, email, subdomain, imageInfo }))(
        jsonData
      );
      let clientDetail = new clientInfoModel(clientObj);
      await clientDetail.save();

      // Step 5: Flush administrative Roles.
      // let role = await flushAdministrativeRoles(clientObj.subdomain);

      // Step 6: Make an entry of the client admin user.
      // Generate salt and hash the user entered password
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(jsonData.password, salt);

      // Seed admin and superadmin roles
      let user = {
        name: jsonData.fullName,
        email: jsonData.email,
        password: hash,
        isSystemUser: true,
        address: null,
        // role: role.adminRoleId,
        imageInfo: jsonData.imageInfo,
        head: true
      };

      let userModel = User.getModel(clientObj.subdomain);
      let userObj = new userModel(user);

      await userObj.save();

      // Step 7: Make an entry of the super admin user.
      user.email = "info@titletransactiondealer.com";
      user.password = await bcrypt.hash("Title@123", salt);
      // user.role = role.superAdminRoleId;
      delete jsonData.imageInfo;
      userObj = new userModel(user);
      await userObj.save();
      // notification.clientAdded();

      return {
        code: 200,
        data: {
          message: ResponseMessages.RegistrationSuccess,
          subdomain: client.subdomain,
          clientId: client._id
        }
      };
    } else {
      return { code: 409, data: duplicates };
    }
  } catch (error) {
    console.log('EEEERRRROOOORRRR', error);

    Logger.log("An error occurred while signup", error, "registerClient");
    return {
      code: 500,
      message: ResponseMessages.RegistrationError
    };
  }
};

module.exports.saveLeads = async function (request) {
  try {
    let LeadModel = await Lead.getModel();
    let leads = new LeadModel(request.body);
    await leads.save();
    return;
  } catch (error) { }
};

module.exports.getClientInfo = function (request) {
  return new Promise((resolve, reject) => {
    Client.getModel().findOne({ subdomain: request.query.subdomain }, function (
      error,
      result
    ) {
      if (error) {
        reject({ code: 500, message: ResponseMessages.GetClientInfoError });
      } else {
        if (result) {
          PortalManager.getUserSubscription(result._id)
            .then(subscriptions => {
              resolve({
                code: 200,
                data: {
                  clientInfo: result,
                  message: ResponseMessages.GetClientInfoSuccess,
                  netsheetConfig: Configs,
                  features: subscriptions.data
                    ? subscriptions.data.features
                    : null
                }
              });
            })
            .catch(error => {
              console.log(error);

              reject({
                code: 500,
                message: ResponseMessages.GetClientInfoError
              });
            });
        } else {
          reject({ code: 404, message: "Subdomain not found." });
        }
      }
    });
  });
};

module.exports.subscribe = async function (request) {
  let EmailModel = EmailSubscription.getModel();
  try {
    let EmailSubscriptionResult = await EmailModel.findOne({
      email: request.body.email
    });
    if (EmailSubscriptionResult) {
      return {
        code: 200,
        data: { message: ResponseMessages.AlreadySubscribed }
      };
    } else {
      let email = new EmailModel(request.body);
      await email.save();
      return {
        code: 200,
        data: { message: ResponseMessages.SubscriptionSuccess }
      };
    }
  } catch (error) { }
};
