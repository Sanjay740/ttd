const portalManager = require("../managers/portal.manager");

module.exports.getStateCounties = function (request, response) {
  portalManager
    .getStateCounties(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.getStates = function (request, response) {
  portalManager
    .getStates()
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getUserSubscription = function (request, response) {
  portalManager.getUserSubscription(request.params.id)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.signup = async function (user) {
  return new Promise((resolve, reject) => {
    // Add signup logic here. add a user to user collection with status active.
    // Reuse logic from add user.
  });
};
