const DocumentManager = require("./document.manager");
const NotificationSetting = require("../models/client/huddle/settings/notificationSetting");
const Summary = require("../util/orderSummary");
const Logger = require("../config/logger");
const OrderSummary = require("../models/client/order/orderSummary");
const ResponseMessages = require("../util/responseMessages");
const CommonUtils = require("../util/common");
const MailConfig = require("../util/email");
const PDF = require("../util/orderPdf");
const notification = require("../notifications/redisNotificationChannels")

module.exports.createOrder = async function (orderDetail, orderType, subdomain) {
  try {
    // Get name of the order model
    let model = await getOrderModel(orderType);
    let OrderSummaryModel = OrderSummary.getModel(subdomain);
    // List all the existing order summaries of the client.
    let existingSummaries = await OrderSummaryModel.find({})
      .limit(1)
      .sort({ _id: -1 });
    // Generate the order number
    let orderNumber = await CommonUtils.generateOrderNumber(
      existingSummaries.length > 0 ? existingSummaries[0].orderNumber : null
    );
    let OrderReference = require("../models/client/order/" + model);
    let OrderModel = OrderReference.getModel(subdomain);
    // Define `getSummary` method to Order Summary model
    Summary.addGetSummaryToOrder(OrderModel);
    let orderJson = orderDetail;
    orderJson.orderNumber = orderNumber;
    let order = new OrderModel(orderJson);
    // Now, fetch the summarised data of the order using `getSummary`
    let orderSummaryData = order.getSummary();
    orderSummaryData["type"] = model;
    orderSummaryData["orderNumber"] = orderNumber;
    let orderSummaryReference = new OrderSummaryModel(orderSummaryData);
    // Save Order Summary
    await orderSummaryReference.save();
    // Save Actual Order Data
    await order.save();
    // Send mail to client
    MailConfig.sendOrderMail(orderSummaryData);
    
    // send notification to admin for service requested
    let userIds = await this.getNotificationSettingUsersId(subdomain, 'ServiceRequested')
    if (userIds.length > 0) {
      notification.serviceRequested(subdomain, orderNumber, orderType, userIds);
    }
    return { code: 200, message: ResponseMessages.SaveOrderSuccess };
  } catch (error) {
    console.log(error);


    // Delete the uploaded documents incase an error occurs.
    if (orderDetail.attachments.length != 0) {
      let promises = orderDetail.attachements.map(attachement => DocumentManager.deleteRemoteFile({ fileName: attachement.path, fileId: attachement.fileId }));
      await Promise.all(promises);
    }
    Logger.log(
      "An error occurred while saving order for client : " +
      subdomain,
      error,
      "createOrder"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.listClientOrders = async function (request) {
  try {
    // Define search query object.
    let input = request.query;
    let query = {};
    let searchStringQuery = { $regex: input.searchString, $options: "i" };
    if (input.orderType) {
      query = input.searchString
        ? { type: input.orderType, requestor: searchStringQuery }
        : { type: input.orderType };
    } else if (input.searchString) {
      query = { requestor: searchStringQuery };
    }

    let searchedData = await OrderSummary.getModel(
      request.headers["subdomain"]
    ).paginate(query, {
      page: parseInt(input.page),
      limit: parseInt(input.limit),
      sort: { _id: -1 }
    });
    return { code: 200, orders: searchedData ? searchedData : null };
  } catch (error) {
    Logger.log(
      "An error occurred while listing orders for client : " +
      request.headers["subdomain"],
      error,
      "listClientOrders"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

module.exports.getOrderByNumber = async function (request) {
  try {
    let OrderModel = require("../models/client/order/" + request.query.orderType);
    let order = await OrderModel.getModel(request.headers["subdomain"]).findOne(
      { orderNumber: request.query.orderNumber }
    );
    return { code: 200, orderDetail: order };
  } catch (error) {
    Logger.log(
      "An error occurred while listing order for client by number: " +
      request.headers["subdomain"],
      error,
      "getOrderByNumber"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};

exports.getNotificationSettingUsersId = async function (subdomain, type) {
  let notification = await NotificationSetting.getModel(subdomain).findOne({ type: type }, { users: 1, _id: 0 });

  if (notification && notification.users && notification.users.length > 0) {
    let users = notification.users.map(async (user) => {
      return user['userId'];
    })
    let userIds = await Promise.all(users);
    return userIds;
  } else {
    return [];
  }
};

module.exports.mailOrderPDF = async function (request) {
  try {
    let OrderModel = require("../models/client/order/" +
      request.body.orderType).getModel(request.headers["subdomain"]);
    let order = await OrderModel.findOne({
      orderNumber: request.body.orderNumber
    });

    await PDF.orderPdf(
      order,
      request.body.mailTo,
      request.body.orderType,
      request.body.companyName,
      request.body.clientLogo
    );
    return { code: 200, message: ResponseMessages.ShareOrderPdfSuccess };
  } catch (error) {
    Logger.log(
      "An error occurred while mailing order pdf ",
      error,
      "getOrderByNumber"
    );
    return { code: 500, message: ResponseMessages.ShareOrderPdfError };
  }
};

async function getOrderModel(type) {
  let orderTypes = require("../entity/orderTypes");
  let model = "";
  Array.prototype.forEach.call(orderTypes, orderType => {
    if (orderType.type === type) {
      model = orderType.model;
    }
  });
  return model;
}


module.exports.updateOrderStatus = async function (request) {
  try {
    let model = request.query.orderModel ? request.query.orderModel : await getOrderModel(request.query.orderType);
    let OrderReference = require("../models/client/order/" + model);
    let OrderModel = await OrderReference.getModel(request.headers["subdomain"]);
    let OrderSummaryModel = await OrderSummary.getModel(request.headers["subdomain"]);
    //Update the order status in respected orderModel
    await OrderModel.updateOne({ orderNumber: request.query.orderNumber }, { status: request.query.status })
    //Update the order status in orderSummary model as well with respected order Number
    await OrderSummaryModel.updateOne({ orderNumber: request.query.orderNumber }, { status: request.query.status })
    return {
      code: 200, data: {
        message: request.query.orderModel ? "Request resumed successfully!." : "Request rejected successfully!."
      }
    };
  } catch (error) {
    Logger.log(
      "An error occurred while updating the order status ",
      error,
      "updateOrderStatus"
    );
    return { code: 500, message: ResponseMessages.TryLater };
  }
};