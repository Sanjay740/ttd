const Client = require("../models/product/client");
const ResponseMessages = require("../util/responseMessages");
const Logger = require("../config/logger");
const StateCounty = require("../models/client/common/county");
const State = require("../models/product/state");
const UserSubscriptionAudit = require("../models/product/userSubscriptionAudit");
const UserSubscription = require("../models/client/userManagement/userSubscription");
const NetsheetAdminManager = require("../managers/netsheet.admin.manager");
const HuddleManager = require("../managers/huddle.manager");
const DivisionDefinition = require("../models/client/netsheet/netsheetDivisionDefinitions");
const notification = require("../notifications/redisNotificationChannels")

module.exports.getStateCounties = async function (request) {
  // try {
  //   let counties = await County.getModel().find(
  //     { state: request.query.state },
  //     { state: 0, _id: 0 }
  //   )
  //   return {
  //     code: 200,
  //     data: counties
  //   }

  // } catch (error) {
  //   return {
  //     code: 500,
  //     message: ResponseMessages.TryLater
  //   }
  // }
  // get states counties for a particular client. 
  try {
    let counties = await StateCounty.getModel(
      request.headers["subdomain"]
    ).find({ state: request.params.state },
      { state: 0, _id: 0 });
    return {
      code: 200,
      data: counties
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }

};

module.exports.getStates = async function (request) {
  try{
    let states = await State.getModel().find({},{state:1});
    return {
      code: 200,
      data: states
    };
  } catch (error) {
    return {
      code: 200,
      message: ResponseMessages.TryLater
    };
  }    

};

module.exports.getUserSubscription = async function (id) {
  try {
    let UserSubscriptionResult = await UserSubscription.getModel().findOne({
      clientId: id
    });
    return {
      code: 200,
      data: UserSubscriptionResult
    };
  } catch (error) {
    console.log(error
    );

  }
};

module.exports.saveClientSubscriptionPlan = async function (info) {
  try {
    let subscribedModules = [];
    info.features.forEach(element => {
      if (element.selected == true) {
        if (element.name == 'Requested Services')
          subscribedModules.push("RequestedService")
        else if (element.name == 'TTD NetSheet')
          subscribedModules.push("NetSheet")
        else
          subscribedModules.push("Huddle")
      }
    });
    subscribedModules.push("Portal");
    notification.clientAdded(subscribedModules, info.subdomain);

    // Check if client already has a subscription.
    let clientSubscription = await UserSubscription.getModel().findOne({
      clientId: info.clientId
    });

    // Set start and end dates of subscription.
    let n = new Date();
    let endDate =
      info.selectedPeriod === "monthly"
        ? new Date(n.getFullYear(), n.getMonth() + 1, n.getDate() - 1)
        : new Date(n.getFullYear() + 1, n.getMonth(), n.getDate() - 1);
    info["startDate"] = n;
    info["endDate"] = endDate;
    info["status"] = "Active";

    let userSubscriptionAudit = new UserSubscriptionAudit.getModel()(info);
    let setNetsheetModule = info.features.find(f => f.id == 2 && f.chosen);
    let setHuddleModule = info.features.find(f => f.id == 3 && f.chosen);
    delete userSubscriptionAudit.upgrade;

    // If the client is subscribing for the first time then explicitly save the details.
    if (!clientSubscription) {
      delete info.upgrade;
      let userSubscription = new UserSubscription.getModel()(info);
      await userSubscription.save();
      await userSubscriptionAudit.save();
      await Client.getModel().updateMany(
        { _id: info.clientId },
        { $set: { subscribed: true } }
      );

      // Set netsheet data if subscribed.
      if (setNetsheetModule) {
        await NetsheetAdminManager.setupNetsheetConfigurationData(
          info.subdomain
        );
      }
      // Set Huddle data if subscribed,
      if (setHuddleModule) {
        await HuddleManager.setSystemRoles(info.subdomain);
        await HuddleManager.setNotificationType(info.subdomain);
        await HuddleManager.setupHuddleConfigurationData(info.subdomain);

      }
      return {
        code: 200,
        message: ResponseMessages.UserSubscriptionSuccess,
        subdomain: info.subdomain
      };
    } else {
      // Handle here if the plan is upgraded by the client.
      if (info.upgrade) {
        delete info.upgrade;
        let userSubscription = UserSubscription.getModel();
        await userSubscription.updateMany(
          { clientId: info.clientId },
          { $set: info }
        );
        await userSubscriptionAudit.save();

        // Find if netsheet is already in the plan and populate data likewise.
        let divsionDefinition = await DivisionDefinition.getModel(
          info.subdomain
        ).find();
        if (setNetsheetModule && divsionDefinition.length === 0) {
          await NetsheetAdminManager.setupNetsheetConfigurationData(
            info.subdomain
          );
        }
        return { code: 200, message: ResponseMessages.PlanUpgradeSuccessful };
      } else {
        return { code: 409, message: ResponseMessages.AlreadySubscribed };
      }
    }
  } catch (error) {
    console.log(error);

    Logger.log(
      "Error while adding subscription of clientId : " + info.clientId,
      error,
      "saveClientSubscriptionPlan"
    );
    return {
      code: 500,
      message: ResponseMessages.SubscriptionFailed
    };
  }
};
