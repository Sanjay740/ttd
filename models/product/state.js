const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const dbConfig = require("../../config/dbConfig");

const stateSchema = new mongoose.Schema({
    state: { type: String },
    code: { type: String },
    counties: { type: Array },
});
// Set plugin for pagination
stateSchema.plugin(mongoosePaginate);

/**
 * ## Model : `State`
 */
module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("State", stateSchema);
};
