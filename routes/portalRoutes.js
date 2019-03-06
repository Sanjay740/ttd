let portalController = require("../controllers/portal.controller");

let express = require("express");
let router = express.Router();

let JWT = require("../util/authentication");

router.get(
  "/getStateCounties",
  portalController.getStateCounties
);
router.get(
  "/getStates",
  portalController.getStates
);
router.get(
  "/getUserSubscription/:id",
  JWT.authenticate,
  portalController.getUserSubscription
);

module.exports = router;