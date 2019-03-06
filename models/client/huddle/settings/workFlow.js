var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const TaskSchema = require("./task").TaskSchema
let dbConfig = require("../../../../config/dbConfig");

let workflowSchema = new Schema({
    title: { type: String },
    description: { type: String },
    tasks: [TaskSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastModifiedDate: { type: Date, default: new Date() },
    createdDate: { type: Date, default: new Date() }
});

module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("Workflow", workflowSchema)
}
