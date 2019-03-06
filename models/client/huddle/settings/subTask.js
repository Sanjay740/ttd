const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let subTaskSchema = new Schema({
  type: { type: String, enum: taskType },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  requestedDate: { type: Date },
  position: { type: number },
  assignedTo: { type: Schema.Types.ObjectId, ref: "contact" },
  componentType: { type: String, enum: componentType },
  // if component type is form then a reference of form will be there.
  formId: { type: Schema.Types.ObjectId, ref: "form" }
});

module.exports = subTaskSchema;
