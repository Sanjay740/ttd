const _ = require("lodash/array");
const Transaction = require("../models/client/huddle/transaction");
const Contact = require("../models/client/common/contact");
let TitleRequest = require("../models/client/order/titleRequestOrder");
const ClosingTeam = require("../models/client/huddle/settings/closingTeam")
const User = require("../models/client/userManagement/user");
module.exports.deducePermissions = async function (userViewPermissions, viewPermissions) {
  let permissions = [];
  // Step 1: Process role permissions
  if (viewPermissions.has("Role")) {
    permissions = viewPermissions.get("Role");
  }

  //Step 2: Process user group permissions.
  if (!!viewPermissions.size) {
    let groups = viewPermissions.get('UserGroups');
    if (groups.length > 0) {
      groups = groups.map(group => group.views).reduce(filterPermissions);
    }
    permissions = filterPermissions(permissions, groups);
  }

  //Step 3: Process user permissions.
  if (userViewPermissions.length > 0) {
    permissions = filterPermissions(permissions, userViewPermissions);
  }

  return permissions;
};

/**
 * This function produces a unique set of view and view part actions's
 * set from the union of role, usergroup and user's permissions.
 * */
function filterPermissions(permissionsSource, permissionsTarget) {
  try {
    permissionsTarget.forEach(element => {
      let viewPermission = permissionsSource.filter(
        p => p.name == element.name
      )[0];
      if (viewPermission) {
        element.viewParts.forEach(vp => {
          let viewPartPermission = viewPermission.viewParts.filter(p => p.name == vp.name);
          if (viewPartPermission) {
            viewPermission.viewParts.push(vp);
          }
        });
        permissionsSource = permissionsSource.map(ps => {
          let el = {}
          if (ps.name === viewPermission.name) {
            el = viewPermission
          } else {
            el = ps;
          };
          return el;
        })
      } else {
        permissionsSource.push(element)
      }

    });
    return permissionsSource;
  } catch (error) {
    console.log(error);

    throw error;
  }
  // permissionsTarget.forEach(element => {
  //   let viewPermission = permissionsSource.filter(
  //     p => p.name == element.name
  //   )[0];

  //   if (viewPermission) {
  //     viewPermission.actions = _.union(
  //       element.actions,
  //       viewPermission.actions
  //     );

  //     viewPermission.viewParts.forEach(vp => {
  //       let viewPartPermission = element.viewParts.filter(
  //         p => p.name == vp.name
  //       )[0];

  //       if (viewPartPermission) {
  //         vp.actions = _.union(vp.actions, viewPartPermission.actions);
  //       } else {
  //         viewPermission.viewParts.push(vp);
  //       }
  //     });
  //     permissionsSource = permissionsSource.map(ps => {
  //       let el = {}
  //       if (ps.name === viewPermission.name) {
  //         el = viewPermission
  //       } else {
  //         el = ps;
  //       };
  //       return el;
  //     })
  //   } else {
  //     permissionsSource.push(element);
  //   }
  // });
  // return permissionsSource;
}

function removeField(obj, field) {
  let ob1 = {};
  ob1 = obj
  delete ob1._id;
  console.log(ob1, field);

  return ob1;
}

// REF
module.exports.getviewContent = async function (request) {
  // Assuming there are only two default views i.e. 1)  SummaryDashboard 2) TransactionsListingDashboard
  let view = request.body.view;
  let email = request.body.email;
  let subdomain = request.headers.subdomain;
  let content = {};
  try {
    if (view == "SummaryDashboard") {
      let totalCount = await Transaction.getModel(subdomain).countDocuments();
      let pendingTransactions = await Transaction.getModel(subdomain).find({
        status: "InProgress"
      });
      let newTransactions = await TitleRequest.getModel(subdomain).find({
        status: "New"
      });
      let closedTransactions = await Transaction.getModel(subdomain).find({
        status: "Closed"
      });
      let holdTransactionsCount = await Transaction.getModel(subdomain).countDocuments({
        status: "OnHold"
      });
      let rejectedTransactionsCount = await TitleRequest.getModel(subdomain).countDocuments({
        status: "Rejected"
      });
      totalCount += rejectedTransactionsCount + newTransactions.length;
      let transactionStatus = {
        totalCount: totalCount,
        pendingTransactionsCount: pendingTransactions.length,
        newTransactionsCount: newTransactions.length,
        closedTransactionsCount: closedTransactions.length,
        holdTransactionsCount: holdTransactionsCount,
        rejectedTransactionsCount: rejectedTransactionsCount
      };
      // We do not have filter on server side saved ,how will we get to know about the filters here.
      // get the all future closing information
      let closingTrackerInformation = await getClosingTrackerInformation(subdomain);

      content = {
        transactionStatus: transactionStatus,
        closingTrackerInformation: closingTrackerInformation,
        newTransactions: newTransactions.length > 0 ? newTransactions[newTransactions.length - 1] : null,
        pendingTransactions: pendingTransactions.length > 0 ? pendingTransactions[pendingTransactions.length - 1] : null,
        closedTransactions: closedTransactions.length > 0 ? closedTransactions[closedTransactions.length - 1] : null
      };
    } else {
      // get the list of transactions for this user. Warning: This may duplicate the transactions if a transaction
      // has duplicate emails on it.
      // console.log('in resolver transactionLisitngDashboard..@@@@@@@@');
      let contact = await Contact.getModel(subdomain).findOne({ 'persons.email': email });
      let transactions = await Transaction.getModel(subdomain).find({ contacts: contact._id });
      content = transactions;
    }
    return {
      code: 200,
      data: content
    };
  } catch (error) {
    console.log(error, 'error');
    return {
      code: 500,
      message: "An error occurred. Please try after sometime."
    };

  }
};


async function getClosingTrackerInformation(subdomain) {
  // Find all closing team which is set by admin
  let closingTeam = await ClosingTeam.getModel(subdomain).findOne({});
  if (closingTeam) {
    //if closing team exists get the all future closing transaction with their embeded contacts
    let futureClosings = await Transaction.getModel(subdomain).find({
      closingDate: {
        $gte: new Date()
      }
    });
    // if future Closing exists then map the future closing with closing team eith their profile if exist or registered
    if (futureClosings.length > 0) {
      let closingDetails = futureClosings.map(async (transaction) => {
        return {
          id: transaction.numberDescriptor.prefix + transaction.numberDescriptor.number + transaction.numberDescriptor.suffix,
          closingDate: transaction.closingDate,
          closingTime: transaction.closingTime
        };

      });
      let futureClosingDetails = await Promise.all(closingDetails);
      return futureClosingDetails;
    } else {
      return [];
    }
  } else {
    return [];
  }
}