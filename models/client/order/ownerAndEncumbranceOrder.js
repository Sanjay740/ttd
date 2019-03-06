const mongoose = require("mongoose");
const contactSchema = require("../common/contact");
const orderStatus = require("../common/enum").orderStatus;
const propertySchema = require("./property");
const attachmentSchema = require("../common/attachment");

// const REPORTTYPE = ['Owners & Encumbrance Report', 'Owners & Encumbrance Report with Final', 'Final Owners & Encumbrance']
// const OWNERTYPE = ['Individual', 'Organization']
// const REPORTDELIVERYTYPE = ['Email', 'Fax', 'Hard Copy']
const dbConfig = require("../../../config/dbConfig");

/*Owner and Encumbrance Order Form*/
const ownerAndEncumbranceOrderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
  requestedFor: { type: { contactSchema } },
  servicesRequested: {
    reportType: { type: String },
    dateNeeded: { type: Date },
    loanNumber: { type: Number },
    reportDelivery: { type: String }
  },
  propertyAddress: {
    propertyInformation: { type: { propertySchema } },
    legalDescription: String,
    parcelNumber: String
  },
  ownerInformation: { contact: { type: contactSchema }, ownerType: String },
  additionalComments: { type: String },
  status:{
    type:String,
    enum:orderStatus,
    default:"New"
  },
  attachments: [attachmentSchema]
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model(
    "OwnerAndEncumbrance",
    ownerAndEncumbranceOrderSchema
  );
};
