const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const dbConfig = require("../../../config/dbConfig");
const orderStatus = require("../common/enum").orderStatus;

const orderSummarySchema = new mongoose.Schema({
  requestor: { type: String },
  property: { type: String },
  type: { type: String },
  createdOn: { type: Date, default: new Date() },
  orderNumber: { type: Number },
  status: {
    type: String,
    enum: orderStatus,
    default: "New"
  }
});

// Set plugin for pagination
orderSummarySchema.plugin(mongoosePaginate);

/**
 * ## Model : `OrderSummary`
 */
module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("OrderSummary", orderSummarySchema);
};
