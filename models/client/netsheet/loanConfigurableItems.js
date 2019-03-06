const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");

/* schema of configurable items */
const loanConfigurableItemsSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  value: { type: Number },
  context: { type: String }
});

/**
 * ## Model : `LoanConfigurableItems`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("LoanConfigurableItems", loanConfigurableItemsSchema);
};
