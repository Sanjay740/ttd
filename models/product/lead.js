const mongoose = require('mongoose')
const dbConfig = require('../../config/dbConfig')

const leadSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String }
})

/**
 * ## Model : `Lead`
 */
module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model('Lead', leadSchema);
}