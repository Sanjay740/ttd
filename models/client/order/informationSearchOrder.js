const mongoose = require("mongoose");
const propertySchema = require("./property");
const orderStatus = require("../common/enum").orderStatus;
const contactSchema = require("../common/contact");
const attachmentSchema = require("../common/attachment");
const lenderSchema = require("./lender");
const SEARCHOPTIONS = ["UCC", "Deed", "Mortgage", "Other"];
const Schema =
  mongoose.Schema; /** capital s is taken from mongoose offical website*/
const dbConfig = require("../../../config/dbConfig");

var informationSearchSchema = new Schema({
  searchType: { type: String },
  searchText: { type: String },
  orderNumber: { type: String },
  propertyAddress: { type: { propertySchema } },
  requestor: { type: { contactSchema } },
  lender: { type: { lenderSchema } },
  additionalComments: { type: String },
  contactInformation: { type: { contactSchema } },
  ownersInformation: [[0] + contactSchema],
  status:{
    type:String,
    enum:orderStatus,
    default:"New"
  },
  attachments: [attachmentSchema]
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("InformationSearch", informationSearchSchema);
};
