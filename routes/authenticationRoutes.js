let express = require("express");
let router = express.Router();

const authController = require("../controllers/auth.controller");

// router.get("/checkCurrentPassword", authController.checkCurrentPassword);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/changeForgottenPassword", authController.changeForgottenPassword);
router.post("/login/:clientId", authController.login);
router.post('/verifyRegistrationToken/:token', authController.verifyRegistrationToken)
router.post("/getviewContent", authController.getviewContent);
router.post("/countMonthTransaction", authController.countMonthTransaction);


module.exports = router;
