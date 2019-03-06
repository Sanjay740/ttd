const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  name: { type: String },
  duplicacy: { type: Number, default: 0 },
  extension: { type: String },
  path: { type: String },
  comment: { type: String },
  fileId: { type: String },
  submittedBy: { type: String },
  submittedDate: { type: String },
});

module.export = documentSchema;
