var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const TransactionTaskSchema = require("./transactionTask").TransactionTaskSchema;
let dbConfig = require("../../../config/dbConfig");

let workflowSchema = new Schema({
    title: { type: String },
    description: { type: String },
    tasks: [TransactionTaskSchema],
    createdDate: { type: Date, default: new Date() },
    processedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' }
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("TransactionWorkflow", workflowSchema)
}
