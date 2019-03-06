const mongoose = require("mongoose");
const orderStatus = require("../common/enum").orderStatus;
const contactSchema = require("../common/contact");
const propertySchema = require("./property");
const attachmentSchema = require("../common/attachment");
const mongoosePaginate = require("mongoose-paginate");
// let dbConfig = require("../config/dbConfig")
/**add more transaction type to enum definition , when more transaction type get introduced in system */
const TRANSACTIONTYPE = ["Equity", "Purchase", "Refinance", "Others"];
const dbConfig = require("../../../config/dbConfig");

const titleRequestOrderSchema = new mongoose.Schema({
  titleInformation: {
    transactionType: {
      type: String,
      enum: TRANSACTIONTYPE,
      default: "Purchase"
    },
    closingDate: { type: Date },
    specialInstructions: { type: String }
  },
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
  propertyAddress: { type: { propertySchema } },
  sellerInformation: { type: { contactSchema } },
  buyerInformation: { type: { contactSchema } },
  refinanceInformation: { type: { contactSchema } }, //A mortgage broker is a licensed professional person which will initiate the loan between buyer and lender.
  attachments: [attachmentSchema],
  status: {
    type: String,
    enum: orderStatus,
    default: "New"
  },
  createdOn: { type: Date, default: new Date() },
});


// Set plugin for pagination
titleRequestOrderSchema.plugin(mongoosePaginate);

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("TitleRequestOrder", titleRequestOrderSchema);
};
