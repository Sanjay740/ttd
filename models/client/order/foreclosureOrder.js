const mongoose = require("mongoose");
const propertySchema = require("./property");
const orderStatus = require("../common/enum").orderStatus;
const contactSchema = require("../common/contact");
const lenderSchema = require("./lender");
const Schema =
  mongoose.Schema; /** capital s is taken from mongoose offical website*/
const attachmentSchema = require("../common/attachment");
const dbConfig = require("../../../config/dbConfig");

/**ForeClosure Form */
const foreClosureSchema = new Schema({
  mortgageForeclosure: { type: Boolean, default: false },
  coop: { type: Boolean, default: false },
  yearsTaxSaleForeclosure20: { type: Boolean, default: false },
  yearsTaxSaleForeclosure60: { type: Boolean, default: false },
  selfReviewUpperCourtJudgements: { type: Boolean, default: false },
  selfOrderTaxAssessmentsAndUtilities: { type: Boolean, default: false },
  foreClosureAttorney: { type: { contactSchema } },
  propertyAddress: { type: { propertySchema } },
  lender: { type: { lenderSchema } },
  additionalComments: { type: String },
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
  other: { type: Boolean },
  foreclosedParties: [[0] + contactSchema],
  status:{
    type:String,
    enum:orderStatus,
    default:"New"
  },
  attachments: [attachmentSchema]
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("ForeClosure", foreClosureSchema);
};
