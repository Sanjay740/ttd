const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

let transactionAuditSchema = new Schema({
    context: { type: String },
    value: Schema.Types.Mixed,
    modifiedDateTime: { type: Date, default: new Date() }
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("TransactionAudit", transactionAuditSchema);
};
