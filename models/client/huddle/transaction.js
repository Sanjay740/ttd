const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = require("../common/address");
const contactSchema = require("../common/contact");
const attachmentSchema = require("../common/attachment");
const transactionStatus = require("../common/enum").transactionStatus;
const closingTeamSchema = require("../huddle/settings/closingTeam").closingTeamSchema;
let dbConfig = require("../../../config/dbConfig");

let transactionNumberSchema = new Schema({
  prefix: { type: String },
  number: { type: String }, // TODO: have it modified as per customer need. for now it is in format like 20180905
  suffix: { type: String }
});

let transactionSchema = new Schema({
  numberDescriptor: transactionNumberSchema, // TODO: get the design done.
  propertyAddress: addressSchema,
  contacts: [{ type: Schema.Types.ObjectId, ref: "Contacts" }], // TODO: link it with user
  closingLocation: addressSchema,
  closingDate: { type: Date, default: null },
  closingTime: Schema.Types.Mixed, // We may figure out the better approach.
  closingTeam: [closingTeamSchema],
  closingAgent: { type: Schema.Types.ObjectId, ref: "User" },
  documents: [attachmentSchema],
  status: { type: String, enum: transactionStatus, default: "InProgress" },
  notes: [{ type: String }],
  createdOn: { type: Date, default: new Date() },
  referenceNumber: { type: String }
  // Add many fields which come into picture
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Transaction", transactionSchema);
};
