const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
/* 
    schema for netSheetContact
*/
const netSheetContactSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  contactCompany: { type: String, index: 1 },
  contactEmail: { type: String, index: 1 },
  propertyAddress: { type: String },
  propertyCity: { type: String },
  propertyState: { type: String },
  propertyZip: { type: String },
  propertyCountry: { type: String },
  estimatedClosingDate: { type: Date },
  generatedDate: { type: Date, default: Date.now }
});
/**
 * ## Model : `NetSheetContact`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("NetSheetContact", netSheetContactSchema);
};
