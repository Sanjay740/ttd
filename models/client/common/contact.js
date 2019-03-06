const mongoose = require("mongoose");
const addressSchema = require("./address");
const personSchema = require("../order/person").personSchema;
// const CONTACTTYPES = require("./contactTypes").contactTypes;
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

const Role = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String }
})
const newContactSchema = new Schema({
  contactType: { type: String, enum: ['Individual', 'Company'] },
  companyName: { type: String },
  address: { addressSchema },
  phone: { type: String },
  fax: { type: String },
  email: { type: String, index: true },
  persons: [personSchema],
  referenceNumber: { type: String },
  requestor: { type: Boolean }, // reprents if the contact is requestor
  relatedContact: { type: String }, //  relatedContact is a reference to the object/contact, e.g. Buyer has its attorney and we can figure out buyer's attorney by comparing related objectid and  contact's collection id
  taxID: { type: String },
  role: Role,
  reusable: { type: Boolean }
})

exports.contactSchema = newContactSchema;
exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Contact", newContactSchema);
};
