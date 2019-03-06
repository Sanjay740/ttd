const mongoose = require("mongoose");
const addressSchema = require("../client/common/address");
const dbConfig = require("../../config/dbConfig");
const Schema = mongoose.Schema;
const imageInfoSchema = require('../common/image')
let clientSchema = new Schema({
  fullName: { type: String, required: true },
  region: { type: String },
  email: { type: String, required: true }, 
  password :{type :String, required:false},
  createdOn: { type: Date },
  head: { type: Boolean },
  address: addressSchema,
  subdomain: { type: String },
  imageInfo: imageInfoSchema,
  isClient: {type : Boolean, required:true ,default: true},
  subscribed: { type: Boolean, required: true, default: false }
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Client", clientSchema);
};
