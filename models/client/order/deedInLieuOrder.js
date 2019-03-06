const mongoose = require("mongoose");
const propertySchema = require("./property");
const policySchema = require("./policy");
const orderStatus = require("../common/enum").orderStatus;
const contactSchema = require("../common/contact");
const attachmentSchema = require("../common/attachment");
let dbConfig = require("../../../config/dbConfig");
// const SEARCHOPTIONS = ['UCC', 'Deed', 'Mortgage', 'Other']
// const Schema = mongoose.Schema /** capital s is taken from mongoose offical website*/

const deedInLieuSchema = new mongoose.Schema({
  propertyAddress: { type: { propertySchema } },
  buyer: { type: contactSchema },
  attorney: { type: { contactSchema } },
  seller: { type: contactSchema },
  additionalComments: { type: String },
  policy: { type: { policySchema } }, // Should it be a collection?, give more thoughts.
  prepareSettlementNotice: { type: Boolean },
  orderNumber: { type: String },
  requestor: { type: contactSchema },
  status:{
    type:String,
    enum:orderStatus,
    default:"New"
  },
  attachments: [attachmentSchema]
});

module.exports.getModel = function(database) { 
  let connection = dbConfig.connect(database);
  return connection.model("DeedInLieu", deedInLieuSchema);
};
