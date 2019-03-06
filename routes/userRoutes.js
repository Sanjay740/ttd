const express = require("express");
const router = express.Router();
const JWT = require("../util/authentication");
const userController = require("../controllers/user.controller");
const DocumentManager = require("../managers/document.manager");

// router.post(
//   "/updateProfile/:id/:currentPassword",
//   JWT.authenticate,
//   userController.updateProfile
// );
router.post("/registerPortalUser", DocumentManager.uploadFile, userController.registerPortalUser);
router.get(
  "/getUserSubscription/:clientId",
  userController.getUserSubscription
);

module.exports = router;
