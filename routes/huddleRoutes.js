let express = require("express");
let router = express.Router();
let huddleController = require("../controllers/huddle.controller");
let JWT = require("../util/authentication");

router.get(
  "/getTransactions/:transactionType",
  JWT.authenticate,
  huddleController.getTransactions
);
router.get(
  "/getClosingDetailByDate",
  huddleController.getClosingDetailByDate
);
module.exports = router;
