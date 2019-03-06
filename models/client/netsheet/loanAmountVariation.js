const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");

/* schema of configurable items */
const loanAmountVariationSchema = new mongoose.Schema({
  type: { type: String },
  percentValue: { type: Number }
});

/**
 * ## Model : `LoanAmountVariation`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("LoanAmountVariation", loanAmountVariationSchema);
};
