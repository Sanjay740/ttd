const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let notificationSettingSchema = new Schema({
    type: { type: String, required: true },
    module: { type: String, required: true },
    users: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        firstName: { type: String },
    }]
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("NotificationSetting", notificationSettingSchema);
};
