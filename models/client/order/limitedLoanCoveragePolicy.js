const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = require("../common/contact");
const propertySchema = require("./property");
const orderStatus = require("../common/enum").orderStatus;
const attachmentSchema = require("../common/attachment");
let dbConfig = require("../../../config/dbConfig");
const OWNERTYPE = ["Individual", "Organization"];
const PROPERTYTYPE = [
  "Unimproved Land",
  "Owner Occupied",
  "Leased",
  "Rental",
  "Existing Building - Over 90 Days",
  "Recent Improvement/Repairs",
  "Commercial"
];

const limitedLoanCoveragePolicySchema = new mongoose.Schema({
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
  requestedFor: { type: { contactSchema } },
  dateNeeded: { type: Date },
  loanNumber: { type: Number },
  mortgageAmount: { type: Number },
  mortgageReadyForPickUp: {
    readyForPickUp: { type: Boolean },
    place: { type: String }
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

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model(
    "LimitedLoanCoveragePolicy",
    limitedLoanCoveragePolicySchema
  );
};
