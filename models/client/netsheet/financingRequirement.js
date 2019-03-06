var mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");

/* financing requirement schema */
const financingRequirementSchema = new mongoose.Schema({
  loanType: { type: Number, index: 1 },
  financingRequirement: { type: Number },
  splitTypeOverride: { type: Number },
  flatAmountOverride: { type: Number }
});

module.exports = financingRequirementSchema;
