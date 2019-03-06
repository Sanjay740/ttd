const OrderManager = require('../managers/order.manager')

module.exports.saveOrder = function (request, response) {
  OrderManager.createOrder(request.body.jsonData, request.params.orderType, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.message)
    })
    .catch(error => {
      response.status(error.code).json(error.message)
    })
}

module.exports.listOrders = function (request, response) {
  OrderManager.listClientOrders(request)
    .then(result => {
      response.status(result.code).json(result)
    })
    .catch(error => {
      response.status(error.code).json(error.message)
    })
};

module.exports.getOrderByNumber = function (request, response) {
  OrderManager.getOrderByNumber(request)
    .then(result => {
      response.status(result.code).json(result)
    })
    .catch(error => {
      response.status(error.code).json(error.message)
    })
};

module.exports.shareOrderPdf = function (request, response) {
  OrderManager.mailOrderPDF(request)
    .then(result => {
      response.status(result.code).json(result.message)
    })
    .catch(error => {
      response.status(error.code).json(error.message)
    })
}


module.exports.updateOrderStatus = function (request, response) {
  OrderManager.updateOrderStatus(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message)
    })
}