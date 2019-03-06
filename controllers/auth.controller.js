const AuthManager = require('../managers/auth.manager')
const EmailUtil = require('../util/email')
const ViewResolver = require('../util/viewResolver')

module.exports.login = function (request, response) {
  AuthManager
    .login(request.body, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.forgotPassword = function (request, response) {
  AuthManager
    .getUserByEmailAndSubdomain(request)
    .then(result => {
      if(result.code == 200)
      {     
      result.data.subdomain = request.body.subdomain ;
      AuthManager
        .generatePasswordToken(result.data,request)
        .then(url => {
          EmailUtil
            .sendforgotPasswordMail(result.data.email, result.data.fullName, url);
            response.status(result.code).send(result.data);
          })
          .catch(error => {
            response.status(error.code).send(error.message);
          });
      }
      else {
        response.status(result.code).send(result.data.message);
      }
    })

    .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.changeForgottenPassword = function (request, response) {
  AuthManager
    .verifiedTokenAndEncrpytPassword(request)
    .then(result => {
      AuthManager
        .changePassword(result)
        .then(result => {
          response.status(result.code).send(result.data);
        })
        .catch(error => {
          response.status(error.code).send(error.message);
        });
    })
    .catch(error => {
      response.status();
    });
};

// module.exports.checkCurrentPassword = function (request, response) {
//   AuthManager
//     .checkCurrentPassword(request)
//     .then(result => {
//       response.status(result.code).send(result.data);
//     })
//     .catch(error => {
//       response.status(error.code).send(error.message);
//     });
// };

module.exports.verifyRegistrationToken = function (request, response) {
  AuthManager.verifyRegistrationToken(request.params.token, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
}

module.exports.getviewContent = function (request, response) {
  ViewResolver
    .getviewContent(request)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      console.log(error);
      response.status(error.code).send(error.message);
    });
};

module.exports.countMonthTransaction = function (request, response) {
  AuthManager
    .countMonthTransaction(request)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};