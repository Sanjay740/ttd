let chatManager = require("../managers/chat.manager")


module.exports.getRoomId = function (request, response) {
  chatManager.getRoomId(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
}

module.exports.getRooms = function (request, response) {
  chatManager.getRooms(request.query.transactionId, request.query.userId, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
}

module.exports.getConversations = function (request, response) {
  chatManager.getConversations(request.query.roomId, request.query.taskId, request.query.page, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).send(result.data);
    })
    .catch(error => {
      response.status(error.code).send(error.message);
    });
}