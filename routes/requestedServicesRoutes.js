const orderController = require("../controllers/order.controller");
let express = require("express");
let router = express.Router();
let JWT = require("../util/authentication");
const documentManager = require('../managers/document.manager')


router.post("/saveOrder/:orderType/:client_id", documentManager.uploadFile, orderController.saveOrder);
router.get("/listOrders", JWT.authenticate, orderController.listOrders);
router.get("/getOrderById", JWT.authenticate, orderController.getOrderByNumber);
router.post("/shareOrderPdf", JWT.authenticate, orderController.shareOrderPdf);
router.get('/updateOrderStatus',JWT.authenticate,orderController.updateOrderStatus)

module.exports = router;
