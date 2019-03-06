const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

let seen = new Schema({
    user: { type: Object },
    seen: { type: Boolean }
})

let conversationSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId },
    sender: { type: Object },
    message: { type: String },
    sentAt: { type: Date },
    transactionId: { type: Schema.Types.ObjectId },
    seen: [seen]
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("Conversation", conversationSchema);
};
