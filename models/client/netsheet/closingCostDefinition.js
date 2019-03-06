const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
const financingRequirement = require("../netsheet/financingRequirement");

/* creating closing cost definition schema */
const closingCostDefinitionSchema = new mongoose.Schema({
  lineNumber: { type: Number },
  description: { type: String },
  isDescriptionEditable: { type: Boolean },
  splitType: { type: Number },
  isAmountEditable: { type: Boolean },
  divisionDefinitionId: { type: mongoose.Schema.Types.ObjectId, index: 1 },
  isActive: { type: Boolean },
  calculationType: { type: Number },
  flatAmount: { type: Number },
  explanation: { type: String },
  applicableForCash: { type: Boolean },
  financingRequirements: [financingRequirement]
});

/**
 * ## Model : `ClosingCostDefinition`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("ClosingCostDefinition", closingCostDefinitionSchema);
};
