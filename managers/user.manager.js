const Client = require("../models/product/client");
const User = require("../models/client/userManagement/user");
const bcrypt = require("bcrypt");
const ResponseMessages = require("../util/responseMessages");
const Logger = require("../config/logger");
const Token = require("../models/client/common/token");

// TODO : Need to modify as per the model changes on huddle.
module.exports.updateProfile = async function (req, data) {
  let userUpdate = await User.getModel().update(
    { _id: req.params.id },
    {
      $set: data
    }
  );

  // if (userUpdate) {
  //   let loginUpdate = await Login.getModel(data.subdomain).update(
  //     { clientId: data._id },
  //     {
  //       $set: {
  //         password: data.password,
  //         userName: data.email
  //       }
  //     }
  //   );
  //   if (loginUpdate) {
  return {
    code: 200,
    data: {
      subdomain: data.subdomain,
      message: ResponseMessages.ProfileUpdateSuccess
    }
  };
  //   } else {
  //   }
  // } else {
  // }
};

//   module.exports.login = async function(request) {
//   return new Promise((resolve, reject) => {
//     let input = request.body;
//     console.log(request.headers["subdomain"]);
//     console.log(input);
//     // SP : Verify if the email exists.
//     Login.getModel(request.headers["subdomain"]).findOne(
//       { userName: input.email },
//       function(error, result) {
//         if (!result) {
//           Logger.log("verifying email", error, "login");
//           reject({ code: 404, message: ResponseMessages.EmailNotFound });
//         } else {
//           // SP : Compare current password with hashed password.
//           bcrypt.compare(input.password, result.password, function(err, res) {
//             if (!res) {
//               Logger.log("Comparing password", err, "Login");
//
// module.exports.updateProfile = function(req, data) {
//   return new Promise((resolve, reject) => {
//     User.getModel().update(
//       { _id: req.params.id },
//       {
//         $set: data
//       },
//       function(err) {
//         if (err) {
//           Logger.log("updating profile", err, "updateProfileDetail");
//           reject({ code: 500, message: ResponseMessages.ProfileUpdateError });
//         } else {
//           Login.getModel(data.subdomain)
//             .update(
//               { clientId: data._id },
//               {
//                 $set: {
//                   password: data.password,
//                   userName: data.email
//                 }
//               }
//             )
//             .then(() => {
//               resolve({
//                 code: 200,
//                 data: {
//                   subdomain: data.subdomain,
//                   message: ResponseMessages.ProfileUpdateSuccess
//                 }
//               });
//             });
//         }
//       }
//     );
//   });
// };

module.exports.manageIfPasswordChanged = async function (currentPassword, data) {
  try {
    if (currentPassword != "null") {
      let salt = await bcrypt.genSalt(10);
      let bcryptHash = await bcrypt.hash(data.password, salt);
      data.password = bcryptHash;
      return data;
    } else {
      return data;
    }
  } catch (error) { }
};

module.exports.verifiedEmailVerificationCode = async function (request) {
  try {
    let data = await Token.getModel().findOne({
      token: request.query.verificationCode,
      tokenFor: "mail-verification"
    });
    if (data) {
      let currentDate = new Date();
      currentDate = new Date(currentDate.toLocaleDateString());
      if (currentDate <= data.expiresAt) {
        return {
          code: 200,
          data: { success: true, message: ResponseMessages.TokenVerified }
        };
      } else {
        return {
          code: 404,
          success: false,
          message: ResponseMessages.TokenExpire
        };
      }
    } else {
      return {
        code: 404,
        success: false,
        message: ResponseMessages.TokenInvalid
      };
    }
  } catch (error) {
    Logger.log(
      "Error at function changeForgottenPassword in user.manager.js",
      error,
      "verifiedEmailCode"
    );
    return {
      code: 500,
      success: false,
      message: ResponseMessages.TryLater
    };
  }
};
