const userManager = require("../managers/user.manager");
const ConfigurationManager = require("../managers/configurationSettings.manager");

module.exports.verifiedEmailCode = function (request, response) {
  userManager
    .verifiedEmailVerificationCode(request)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.getUserSubscription = function (request, response) {
  userManager
    .getUserSubscription(request.params.clientId)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.registerPortalUser = function (request, response) {
  ConfigurationManager
    .updateUser(request.body.jsonData, request.headers['subdomain'], true, request.query)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
}