const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

const tokenSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  token: { type: String },
  tokenFor: { type: String },
  expiresAt: { type: Date }
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Token", tokenSchema);
};
