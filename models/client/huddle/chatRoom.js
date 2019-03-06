const mongoose = require("mongoose");
let dbConfig = require("../../../config/dbConfig");



module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("ChatRoom", chatRoomSchema);
};let chatRoomSchema = mongoose.Schema({
  roomId: { type: String },
  roomName: { type: String },
  transactionId: { type: mongoose.Schema.Types.ObjectId },
  users: { type: Array },
  tasks: { type: Array }
})