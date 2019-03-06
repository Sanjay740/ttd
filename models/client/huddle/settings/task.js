const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const taskType = require("../../common/enum").taskType;
const componentType = require("../../common/enum").componentType;
const contactTypeSchema = require("../contactType").contactTypeSchema;
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let taskSchema = new Schema({
  numberOfDocument: { type: Number, default: null },
  action: { type: String, default: null },
  type: { type: String, enum: taskType },
  title: { type: String, required: true },
  description: { type: String },
  position: { type: Number, default: 0 },
  componentType: { type: String, enum: componentType },
  // if component type is CustomziedForm then a reference of form will be there.
  formId: { type: Schema.Types.ObjectId, ref: "form" },
  // this property will have reference to the route under components/huddle/forms. e.g. /xyz
  formRoute: { type: String },
  contacts: [contactTypeSchema],
});
// Set plugin for pagination
taskSchema.plugin(mongoosePaginate);

exports.TaskSchema = taskSchema;

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Task", taskSchema);
};
