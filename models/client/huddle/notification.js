const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

const messageSchema = new Schema({
    type: { type: String, required: true },
    module: { type: String, required: true },
    userIds: [],
    seen: { type: Boolean, default: true },
    backGroundColor: { type: String },
    fontStyle: { type: String, required: true },
    data: Schema.Types.Mixed,
    message: { type: String },
    createdOn: { type: Date, default: new Date() }
})

const notificationSchema = new Schema({
    key: { type: Schema.Types.ObjectId, ref: 'User', },
    list: [messageSchema]
});


module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("Notification", notificationSchema);
};
