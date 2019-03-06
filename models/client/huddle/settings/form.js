const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let formSchema = new Schema({
  title: { type: String },
  JSONVal: { type: String },
  lastUpdated: { type: Date }
});

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("Form", formSchema);
};
