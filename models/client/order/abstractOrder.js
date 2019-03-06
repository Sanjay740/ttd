const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = require("../common/contact");
const orderStatus = require("../common/enum").orderStatus;
const attachmentSchema = require("../common/attachment");
const propertySchema = require("./property");
const REPORTTYPE = ["New Abstract", "Abstract Update", "Stub Abstract"];
const REPORTDELIVERYTYPE = ["Email", "Fax", "Hard Copy"];
const dbConfig = require("../../../config/dbConfig");

/*Abstract Order Form*/
const abstractOrderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
  requestedFor: { type: { contactSchema } },
  servicesRequested: {
    reportType: { type: String, enum: REPORTTYPE },
    dateNeeded: { type: Date },
    loanNumber: { type: Number },
    reportDelivery: { type: String, enum: REPORTDELIVERYTYPE }
  },
  propertyAddress: {
    propertyInformation: { type: { propertySchema } },
    legalDescription: { type: String },
    parcelNumber: { type: String }
  },
  status:{
    type:String,
    enum:orderStatus,
    default:"New"
  },
  additionalComments: { type: String },
  attachments: [attachmentSchema]
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Abstract", abstractOrderSchema);
};
