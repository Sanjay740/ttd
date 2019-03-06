const mongoose = require("mongoose");
const propertySchema = require("./property");
const contactSchema = require("../common/contact");
const orderStatus = require("../common/enum").orderStatus;
const lenderSchema = require("./lender");
// let dbConfig = require("../config/dbConfig")
const attachmentSchema = require("../common/attachment");
const Schema =
  mongoose.Schema; /** capital s is taken from mongoose offical website*/
const dbConfig = require("../../../config/dbConfig");

/** REO Form */
const reoSchema = new Schema({
  propertyAddress: { type: { propertySchema } },
  orderingCompany: { type: { contactSchema } },
  foreclosedParties: [[0] + contactSchema],
  lender: { type: { lenderSchema } },
  orderNumber: { type: String },
  requestor: { type: { contactSchema } },
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
  return connection.model("REO", reoSchema);
};
