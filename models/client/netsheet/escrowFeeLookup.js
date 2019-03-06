const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
const mongoosePaginate = require("mongoose-paginate");

/* 
    create escrow fee lookup schema
*/
const escorwFeeLookupSchema = new mongoose.Schema({
  amount: { type: Number, index: 1 },
  escrowFee: { type: Number, index: 1 },
  county: { type: String, index: 1 },
  effectiveDate: { type: Date },
  isShortSale: { type: Boolean }
});
escorwFeeLookupSchema.plugin(mongoosePaginate);
/**
 * ## Model : `EscrowFeeLookup`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("EscrowFeeLookup", escorwFeeLookupSchema);
};
