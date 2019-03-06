let Logger = require("../config/logger");
let UserSubscription = require("../models/client/userManagement/userSubscription");
let Feature = require("../models/product/feature");
let Discount = require("../models/product/discount");
let bcrypt = require("bcrypt");
var authentication = require("../util/authentication");
let User = require("../../server/models/product/client");
let OrderSummary = require("../models/client/order/orderSummary");
let generateObjectId = require("../util/common").generateObjectId;
let orderTypes = require("../entity/orderTypes");
let findIndex = require("../util/common").findIndex
const LoginResponse = require('../dto/loginResponse')

/**
 * Jay:get all the user's submission and subscription against the particular order/forms
 */
module.exports.getAllSubmissionAndSubscription = function(request, response) {
  var query = { email: { $ne: "admin@gmail.com" } };
  getSubscription()
    .then(subscription => {
      let counter = 0;
      let orderSubmission = [];
      User.getModel().find(query, function(error, res) {    
        if (res.length > 0) {
          res.forEach(element => {
            getSubmission(element.subdomain, null).then(data => {  
              counter++;
              if (data != 0) {
                data.forEach(element => {                 
                  orderSubmission.push(element);
                });
              }      
              if (counter === res.length) {
                getEachOrderSubmissionSubscriptionCount(
                  subscription,
                  orderSubmission
                ).then(data => {
                  response.status(200).json({
                    success: true,
                    totalSubmissionAndSubscription: data,
                    message: "AllSubmissionAndSubscription get successfully."
                  });
                });
              }
            });
          });
        } else {
          getEachOrderSubmissionSubscriptionCount(
            subscription,
            orderSubmission
          ).then(data => {
            response.status(200).json({
              success: true,
              totalSubmissionAndSubscription: data,
              message: "AllSubmissionAndSubscription get successfully."
            });
          });
        }
      });
    })
    .catch(err => {
      Logger.log("NO DATA FOUND : getAllSubmissionAndSubscription");
      response.status(404).send("No data found");
    });
};

function getEachOrderSubmissionSubscriptionCount(
  subscription,
  orderSubmission
) {
  let totalSubmissionAndSubscription = [];
  return new Promise((resolve, reject) => {
    Array.prototype.forEach.call(orderTypes, orderType => {
      let SubscriptionIndex = findIndex(subscription, "_id", orderType.id);
      let SubmissionIndex = findIndex(orderSubmission, "_id", orderType.model);
      totalSubmissionAndSubscription.push({
        id: orderType.id,
        type: orderType.type,
        name: orderType.name,
        totalSubmission:
          SubmissionIndex != -1 ? orderSubmission[SubmissionIndex].count : 0,
        imageName: orderType.imageName,
        numberOfSubscription:
          SubscriptionIndex != -1 ? subscription[SubscriptionIndex].count : 0
      });
      if (totalSubmissionAndSubscription.length == orderTypes.length) {
        resolve(totalSubmissionAndSubscription);
      }
    });
  });
}

function getSubscription() {
  return new Promise((resolve, reject) => {
    UserSubscription.getModel().aggregate(
      [
        { $sort: { _id: -1 } },
        { $unwind: "$features" },
        { $match: { "features.id": 1 } },
        { $unwind: "$features.subFeatures" },
        { $match: { "features.subFeatures.selected": true } },
        {
          $group: {
            _id: "$features.subFeatures.id",
            count: {
              $sum: 1
            }
          }
        }
      ],
      function(error, result) {
        if (!result) {
          Logger.log("NO DATA FOUND : getSubscription");
          reject({ code: 404, message: "No data found" });
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getOrderModel(type) {
  return new Promise((resolve, reject) => {
    // DSH: figure out the order model from OrderType
    let orderTypes = require("../entity/orderTypes");
    Array.prototype.forEach.call(orderTypes, orderType => {
      if (orderType.type === type) {
        resolve({ model: orderType.model });
      }
    });
    reject({
      status: 504,
      message: "could not find model for this order type"
    });
  });
}

module.exports.getSelectedFormSubmission = function(request, response) {
  let counter = 0;
  let selectedSubmission = [];
  var query = { email: { $ne: "admin@gmail.com" } };
  getOrderModel(request.query.orderType)
    .then(order => {
      User.getModel().find(query, function(error, res) {
        if (res.length > 0) {
          res.forEach(element => {
            getSubmission(element.subdomain, order.model).then(
              submissionCount => {
                counter++;
                if (submissionCount > 0) {
                  submissionCount.forEach(submission => {
                    selectedSubmission.push({
                      name: element.fullName,
                      submissionCount: submission.count
                    });
                  });
                }
                if (counter == res.length) {
                  response.status(200).json({
                    success: true,
                    usersubmission: selectedSubmission,
                    message: "Selected Form Submission get successfully."
                  });
                }
              }
            );
          });
        } else {
          response.status(200).json({
            success: true,
            usersubmission: [],
            message: "Selected Form Submission get successfully."
          });
        }
      });
    })
    .catch(err => {
      Logger.log("NO DATA FOUND : getSelectedFormSubmission");
      response.status(404).send("No data found");
    });
};

function getSubmission(subdomain, modelname) {
  let query =
    modelname != null
      ? [
          { $match: { type: modelname } },
          { $group: { _id: "$type", count: { $sum: 1 } } }
        ]
      : [{ $group: { _id: "$type", count: { $sum: 1 } } }];
  return new Promise((resolve, reject) => {
    OrderSummary.getModel(subdomain).aggregate(query, function(error, result) {
      if (!result) {
        Logger.log("NO DATA FOUND : getSubmission");
        reject({ code: 404, message: "No data found" });
      } else {
        if (result.length > 0) {
          resolve(result);
        } else {
          resolve(0);
        }
      }
    });
  });
}

//RL:Get the all recent orders respect with forms/Order of each client
module.exports.getAllRecentSubmission = function(request, response) {
  let counter = 0;
  let orderSubmission = [];
  var query = { email: { $ne: "admin@gmail.com" } };
  User.getModel()
    .find(query, function(error, res) {
      if (res) {
        res.forEach(element => {
          getEachOrderCount(element.subdomain).then(data => {
            counter++;
            orderSubmission.push({
              name: element.fullName,
              orderSubmission: data.orderSubmission
            });
            if (counter === res.length) {
              response.status(200).json({
                success: true,
                user: orderSubmission,
                message: "Recent submissions get successfully."
              });
            }
          });
        });
      } else {
        Logger.log("NO DATA FOUND : getAllRecentOrders");
        response.status(404).send("No data found");
      }
    })
    .sort({ _id: -1 });
};

function getEachOrderCount(subdomain) {
  let orderSubmission = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    Array.prototype.forEach.call(orderTypes, orderType => {
      let OrderModel = require("../models/client/order/" + orderType.model);
      OrderModel.getModel(subdomain).find({}, function(error, model) {
        counter++;
        if (model) {
          orderSubmission.push({
            name: orderType.name,
            count: model.length
          });
        }
        if (counter === orderTypes.length) {
          resolve({ orderSubmission: orderSubmission });
        }
      });
    });
  });
}
//RL:Get the all recent orders respect with forms/Order of each client
module.exports.getAllRecentSubscription = function(request, response) {
  let orderSubscription = [];
  let counter = 0;
  UserSubscription.getModel().aggregate(
    [
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$features" },
      {
        $match: { "features.id": 1 }
      },
      {
        $project: {
          name: "$user.fullName",
          subscription: "$features"
        }
      }
    ],
    function(error, result) {
      if (!result) {
        Logger.log("NO DATA FOUND : getAllRecentSubscription");
        response.status(404).send("No data found");
      } else {
        result.forEach(element => {
          if (element.subscription.selected) {
            orderSubscription.push({
              name: element.name[0],
              orderSubscription: element.subscription.subFeatures
            });
          } else {
            let subscribedSubfeature = [];
            element.subscription.subFeatures.forEach(subfeature => {
              if (subfeature.selected) {
                subscribedSubfeature.push(subfeature);
              }
            });
            orderSubscription.push({
              name: element.name[0],
              orderSubscription: subscribedSubfeature
            });
          }
          counter++;
          if (counter == result.length)
            response.status(200).json({
              success: true,
              user: orderSubscription,
              message: "Recent Subscription get successfully."
            });
        });
      }
    }
  );
};

// RL:Get All the list of form subscription of each client
module.exports.getSelectedFormSubscription = function(request, response) {
  let id = Number.parseInt(request.query.id);
  UserSubscription.getModel().aggregate(
    [
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$features" },
      { $match: { "features.id": 1 } },
      { $unwind: "$features.subFeatures" },
      {
        $match: {
          $and: [
            { "features.subFeatures.id": id },
            { "features.subFeatures.selected": true }
          ]
        }
      },
      {
        $project: {
          name: "$user.fullName",
          createdDate: "$user.createdOn",
          email: "$user.email",
          status: "$status"
        }
      }
    ],
    function(error, result) {
      if (!result) {
        Logger.log("NO DATA FOUND : getSelectedFormSubscription");
        response.status(404).send("No data found");
      } else {
        response.status(200).json({
          success: true,
          subscription: result,
          message: "Selected Form Subscription get successfully."
        });
      }
    }
  );
};

//RL:Get the list of all Client/Users
module.exports.getAllClient = function(request, response) {
  var query = { email: { $ne: "admin@gmail.com" } };
  User.getModel()
    .find(query, function(error, result) {
      if (!result) {
        Logger.log(
          error,
          "Error at function getAllClient in user.controller.js"
        );
        response.status(404).send("No data found");
      } else {
        response.status(200).json({
          success: true,
          client: result,
          message: "client get successfully."
        });
      }
    })
    .sort({ _id: -1 });
};

//RL:Login the superadmin
module.exports.superAdminLogin = function (request, response) {
  let input = request.body;
  let token = authentication.generateJWT(input.email, 7200);
  User.getModel().findOne(
    { email: input.email },
    function (error, result) {
      //RL:Add superadmin
      if (result == null) {
        var credentials = {
          email: "admin@gmail.com",
          password: "admin",
          fullName: "admin",
          isClient : false
        };
         if (input.email == credentials.email && input.password == credentials.password) {
           let UserModel = User.getModel();
           let superAdminDetails = new UserModel(credentials);
           bcrypt.genSalt(10, function (err, salt) {
           bcrypt.hash(superAdminDetails.password, salt, function (err, hash) {
               superAdminDetails.password = hash;
               superAdminDetails.save(function (error, result) {
                 if (error) {
                   Logger.log("registering admin", error, "addSuperAdmin");
                   response
                     .status(500)
                     .send("Some error occured, please try later.");
                 } else {
                   
                let ls = new LoginResponse();
                ls.user._id = result._id;               
                ls.user.imageInfo = result.imageInfo;
                ls.user.role = "superAdmin"
                ls.token = token;  
                   response.status(200).json({
                      message: "Logged in Successfully.",
                      loginResponse: ls
                   });
                 
                 }
               });
             });
          });
         }
         else {
          response.status(404).json({ message: "Incorrect credential."});
         }
      }
      else {
        if (!result) {
          Logger.log("verifying superAdmin", error, "superAdminLogin");
          response.status(404).json({ message: "Incorrect credential."});
        } else {
          bcrypt.compare(input.password, result.password, function (err, res) {
            if (!res) {
              response.status(404).json({ message: "Incorrect credential."});
            } else {
              let ls = new LoginResponse();
              ls.user._id = result._id;               
              ls.user.imageInfo = result.imageInfo;
              ls.user.role = "superAdmin"
              ls.token = token;  
                 response.status(200).json({                 
                    message: "Logged in Successfully.",
                    loginResponse: ls
                
                 });
            }
          });
        }
      }
    }
  );
};
//RL:Login
// module.exports.superAdminLogin = function(request, response) {
//   let input = request.body;
//   User.getModel().findOne(
//     { email: input.email, _id: request.params.superAdminId },
//     function(error, result) {
//       if (!result) {
//         Logger.log("verifying superAdmin", error, "superAdminLogin");
//         response.status(404).send("Please enter registered email");
//       } else {
//         bcrypt.compare(input.password, result.password, function(err, res) {
//           if (!res) {
//             response.status(404).send("Incorrect password");
//           } else {
//             let token = authentication.generateJWT(result.email, 7200);
//             response.status(200).json({
//               success: true,
//               token: token,
//               message: "Logged in Successfully."
//             });
//           }
//         });
//       }
//     }
//   );
// };

// RL:ADD Feature
module.exports.addFeature = function(request, response) {
  // assign ids to features/subfeatures.
  request.body.id = generateObjectId();
  request.body.subFeatures.forEach(element => {
    element.id = generateObjectId();
  });
  let FeatureModel = Feature.getModel();
  let feature = new FeatureModel(request.body);
  feature.save(function(error, result) {
    if (error) {
      Logger.log("adding feature", error, "AddFeature");
      response.status(500).send("An error occurred while adding feature.");
    } else {
      response.status(200).json({
        message: "Feature added successfully."
      });
    }
  });
};

// RL:update Feature
module.exports.updateFeature = function(request, response) {
  Feature.getModel().update(
    { _id: request.params.featureId },
    {
      $set: request.body
    },
    function(err, result) {
      if (err) {
        Logger.log("updating Feature", err, "updateFeature");
        response.status(500).send("Some error occured, please try later.");
      } else {
        response.status(200).json({
          success: true,
          message: "Feature updated successfully."
        });
      }
    }
  );
};
// RL:Change Feature status
module.exports.changeFeatureStatus = function(request, response) {
  Feature.getModel().update(
    { _id: request.query.featureId },
    {
      $set: {
        active: request.query.active
      }
    },
    function(err, result) {
      if (err) {
        // Logger.log("changing Feature status", err, "changeFeatureStatus");
        response.status(500).send("Some error occured, please try later.");
      } else {
        response.status(200).json({
          success: true,
          message:
            request.query.active == "true"
              ? "Feature enabled successfully."
              : "Feature disabled successfully."
        });
      }
    }
  );
};
// RL: Add Discount if not added
function getDiscount() {
  return new Promise((resolve, reject) => {
    Discount.getModel()
      .find(function(err, res) {
        if (err) {
          Logger.log("adding Discount", err, "addDiscount");
          reject({
            code: 500,
            message: "An error occurred while adding discount."
          });
        } else {
          if (res) {
            resolve(res[0]);
          } else {
            Discount.getModel()({ value: 0 }).save(function(error, result) {
              if (error) {
                Logger.log("adding Discount", error, "addDiscount");
                reject({
                  code: 500,
                  message: "An error occurred while adding discount."
                });
              } else {
                resolve(result);
              }
            });
          }
        }
      })
      .sort({ effectiveDate: -1 });
  });
}

module.exports.setDiscount = function(request, response) {
  let data = request.body;
  data["effectiveDate"] = new Date();
  Discount.getModel().create(data, function(err, result) {
    if (err) {
      Logger.log("Setting Discount", err, "setDiscount");
      response.status(500).send("An error occurred. Please try after sometime");
    } else {
      response.status(200).json({
        success: true,
        message: "Discount applied successfully"
      });
    }
  });
};

// RL:Get All list of Features
module.exports.getFeatures = function(request, response) {
  let status = Boolean(request.params.active);
  let query = !status ? {} : { active: status };
  Feature.getModel().find(query, function(error, result) {
    if (!result) {
      Logger.log("NO DATA FOUND : getAllSubFeature");
      response.status(500).send("No data found");
    } else {
      getDiscount()
        .then(res => {
          response.status(200).json({
            success: true,
            feature: result,
            discount: res
          });
        })
        .catch(error => {
          response.status(error.code).send(error.message);
        });
    }
  });
};

// PK: Get Feature by Id
module.exports.getFeatureById = function(request, response) {
  Feature.getModel().findOne({ _id: request.query.featureId }, function(
    error,
    result
  ) {
    if (!result) {
      Logger.log("NO DATA FOUND : getFeatureById");
      response.status(404).send("No data found");
    } else {
      response.status(200).json({
        success: true,
        feature: result,
        message: "Feature get successfully."
      });
    }
  });
};

// RL: check existence of feature
module.exports.checkFeatureExistence = function(request, response) {
  let searchfeatureName = { $regex: request.query.featureName, $options: "i" };
  var query = request.query.id
    ? {
        name: searchfeatureName,
        _id: { $ne: request.query.id }
      }
    : {
        name: searchfeatureName
      };
  Feature.getModel()
    .findOne(query)
    .then(result => {
      response.status(200).json({
        success: true,
        Exists: result ? true : false,
        message: result ? "Feature name already exists." : "Feature is unique"
      });
    })
    .catch(error => {
      Logger.log(
        "checking Feature name existence",
        error,
        "checkFeatureExistence"
      );
      response.status(404).send("Some error occured, please try later.");
    });
};
