const superAdminController = require("../controllers/superadmin.controller");
let express = require("express");
let router = express.Router();
let JWT = require("../util/authentication");

router.get(
  "/getAllSubmissionAndSubscription",
  JWT.authenticate,
  superAdminController.getAllSubmissionAndSubscription
);
router.get(
  "/getSelectedFormSubmission",
  JWT.authenticate,
  superAdminController.getSelectedFormSubmission
);
router.get(
  "/getSelectedFormSubscription",
  JWT.authenticate,
  superAdminController.getSelectedFormSubscription
);
router.get(
  "/getAllRecentSubscription",
  JWT.authenticate,
  superAdminController.getAllRecentSubscription
);
router.get(
  "/getAllRecentSubmission",
  JWT.authenticate,
  superAdminController.getAllRecentSubmission
);
router.post(
  "/superAdminLogin",
  superAdminController.superAdminLogin
);
router.get(
  "/getAllClient",
  JWT.authenticate,
  superAdminController.getAllClient
);
router.post("/addFeature", JWT.authenticate, superAdminController.addFeature);
router.post(
  "/updateFeature/:featureId",
  JWT.authenticate,
  superAdminController.updateFeature
);
router.get(
  "/changeFeatureStatus",
  JWT.authenticate,
  superAdminController.changeFeatureStatus
);
router.get("/getFeatures", superAdminController.getFeatures);
router.get("/getFeatures/:active", superAdminController.getFeatures);
router.get("/getFeatureById", superAdminController.getFeatureById);
router.get(
  "/checkFeatureExistence",
  superAdminController.checkFeatureExistence
);
router.post(
  "/setFeatureDiscount",
  JWT.authenticate,
  superAdminController.setDiscount
);

module.exports = router;
