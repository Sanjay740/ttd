const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
const mongoosePaginate = require("mongoose-paginate");

/* Schema of titlePremiumLookup */
const titlePremiumsLookupSchema = new mongoose.Schema({
  amount: { type: Number, index: 1 },
  cost: { type: Number, index: 1 },
  county: { type: String },
  effectiveDate: { type: Date }
});
titlePremiumsLookupSchema.plugin(mongoosePaginate);

/**
 * ## Model : `TitlePremiumsLookup`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("TitlePremiumsLookup", titlePremiumsLookupSchema);
};
