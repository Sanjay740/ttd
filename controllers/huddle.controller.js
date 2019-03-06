const huddleManager = require("../managers/huddle.manager");
const transactionManager = require("../managers/transaction.manager");

module.exports.getTransactions = function(request, response) {
  transactionManager
    .getTransactions(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.getClosingDetailByDate = function(request, response) {
  huddleManager
    .getClosingDetailByDate(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
}
