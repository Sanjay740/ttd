const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let closingLocationSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String },
  location: { type: Object }
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("ClosingLocation", closingLocationSchema);
};
