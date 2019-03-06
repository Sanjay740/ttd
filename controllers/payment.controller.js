const payment = require("../managers/payment.manager");
const ResponseMessage = require("../util/responseMessages");
const portalManager = require("../managers/portal.manager");

module.exports.generateToken = function(req, res) {
  payment
    .generateToken()
    .then(result => {
      res.status(200).json({
        success: true,
        clientToken: result.clientToken,
        message: ResponseMessage.BTTokenSuccess
      });
    })
    .catch(error => {
      console.log(error);
      res
        .status(404)
        .send({ success: false, message: ResponseMessage.BTTokenFail });
    });
};

module.exports.checkout = function(request, response) {
  payment
    .makepayment(request.body.amount, request.body.nonce)
    .then(paymentResponse => {
      if (paymentResponse.success) {
        request.body["paymentSuccessful"] = true;
        request.body["paymentMadeOn"] = paymentResponse.transaction.createdAt;
        portalManager
          .saveClientSubscriptionPlan(request.body)
          .then(result => {
            response.status(result.code).send(result);
          })
          .catch(error => {
            response
              .status(500)
              .json({ status: true, message: ResponseMessage.PaymentFail });
          });
      } else {
        response.status(400).send("Payment failed.");
      }
    })
    .catch(() => {
      response
        .status(500)
        .json({ status: true, message: ResponseMessage.PaymentFail });
    });
};
