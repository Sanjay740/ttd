const mongoose = require("mongoose");
const addressSchema = require("../../common/address");
const Schema = mongoose.Schema;
let dbConfig = require("../../../../config/dbConfig");

let closingScheduleSchema = new Schema({
    title: { type: String, required: true },
    address: addressSchema,
    date: { type: Date },
    time: { type: Object },
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("ClosingSchedule", closingScheduleSchema);
};
