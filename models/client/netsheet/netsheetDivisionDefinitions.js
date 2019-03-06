const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");

/* 
    create netsheet division definition schema
*/
const netsheetDivisionDefinitions = new mongoose.Schema({
  description: { type: String },
  sortOrder: { type: Number },
  isActive: { type: Boolean },
  color: { type: String }
});

/**
 * ## Model : `NetsheetDivisionDefinitions`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model(
    "NetsheetDivisionDefinitions",
    netsheetDivisionDefinitions
  );
};
