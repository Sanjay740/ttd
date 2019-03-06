let express = require("express");
let router = express.Router();

const paymentController = require("../controllers/payment.controller");
const productController = require("../controllers/product.controller");
const DocumentManager = require("../managers/document.manager");

router.post("/signUp", DocumentManager.uploadFile, productController.signUp);
router.post("/submitQuery", productController.submitQuery);
router.post("/subscribeEmail", productController.subscribeEmail);
router.get("/generateBTToken", paymentController.generateToken);
router.post("/checkout", paymentController.checkout);
router.get("/getClientInfo", productController.getClientInfo);

module.exports = router;
