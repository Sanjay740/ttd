const mongoose = require("mongoose");
let dbConfig = require("../../../../config/dbConfig");

const componentAttributeSchema = new mongoose.Schema({
  type: { type: String },
  required: { type: Boolean, default: false },
  placeholder: { type: String },
  name: { type: String },
  label: { type: String },
  tag: { type: String },
  minlength: { type: Number },
  maxlength: { type: Number },
  selectOptions: { type: Array },
  checkboxOptions: { type: Array },
  radioOptions: { type: Array },
  yesNoOPtions: { type: Array },
  accept: { type: String },
  multiple: { type: Boolean },
  rowslength: { type: Number },
  colslength: { type: Number }
});
const componentSchema = new mongoose.Schema({
  name: { type: String },
  class: { type: String },
  componentAttributes: componentAttributeSchema
});

const formBuilderSchema = new mongoose.Schema({
  formTitle: { type: String },
  createdOn: { type: String },
  components: [componentSchema]
});

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("FormBuilder", formBuilderSchema);
};
