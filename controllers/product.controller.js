const ProductManager = require("../managers/product.manager");
const EmailUtil = require("../util/email");

// Client signup
module.exports.signUp = function (request, response) {
  ProductManager.registerClient(request.body.jsonData)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.submitQuery = function (request, response) {
  ProductManager.saveLeads(request)
  .then(() => {
    EmailUtil.submitQueryMail(request.body)
      response.status(result.code).send(result.message);
    })
  .catch(error => {
      response.status(error.code).send(error.message);
    });
};

module.exports.getClientInfo = function (request, response) {
  ProductManager.getClientInfo(request)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      console.log(error);

      response.status(error.code).send(error.message);
    });
};

module.exports.subscribeEmail = function (request, response) {
  ProductManager.subscribe(request)
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
};
