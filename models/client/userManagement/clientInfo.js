const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
const Schema = mongoose.Schema;
const imageSchema = require("../../common/image");

let clientSchema = new Schema({
  fullName: { type: String, required: true },
  region: { type: String },
  email: { type: String, required: true },
  password: { type: String }, 
  subdomain: String,
  imageInfo: imageSchema,
  subscribed: { type: Boolean, required: true, default: false }
});

// This collection will reside in Client database
module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("ClientInfo", clientSchema);
};
