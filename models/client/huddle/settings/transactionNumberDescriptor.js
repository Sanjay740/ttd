const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let transactionNumberSchema = new Schema({
  prefix: { type: String },
  number: { type: String }, // TODO: have it modified as per customer need. for now it is in format like 20180905
  suffix: { type: String }
});

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("TransactionNumber", transactionNumberSchema);
};
