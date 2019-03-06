const mongoose = require("mongoose");
const taskType = require("../common/enum").taskType;
const componentType = require("../common/enum").componentType;
const taskStatus = require("../common/enum").taskStatus;
const contactTypeSchema = require("./contactType").contactTypeSchema;
const attachmentSchema = require("../common/attachment")
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");
let taskSchema = new Schema({
  numberOfDocument: { type: Number, default: null },
  action: { type: String, default: null },
  type: { type: String, enum: taskType },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, default: null },
  requestedDate: { type: Date, default: null },
  position: { type: Number },
  status: { type: String, enum: taskStatus, default: "New" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "Contact" },
  assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
  contacts: [contactTypeSchema],
  isManual: { type: Boolean, default: true },
  componentType: { type: String, enum: componentType },
  // // contains form json in key value pair
  // FormData: { type: Schema.Types.String, default: null },
  FormData: { type: Schema.Types.Mixed, default: null },
  // // below properties if component type is for predefined form
  formRoute: { type: String, default: null },
  // // below properties if component type is for customized form
  formId: { type: String, default: null },
  // // below properties if component type is Document.
  documents: [attachmentSchema],
});

exports.TransactionTaskSchema = taskSchema;
// module.exports = taskSchema;
module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("TransactionTask", taskSchema);
};