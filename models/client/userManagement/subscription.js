const mongoose = require('mongoose')
const logoSchema = require("./logo");
const Schema = mongoose.Schema /** capital s is taken from mongoose offical website*/
const dbConfig = require('../../config/dbConfig')

const subscriptionSchema = new Schema({
    name: { type: String },
    packageType: { type: String },
    numberOfUser: { type: Number },
    numberOfDays: { type: Number },
    monthlyPrice: { type: Number },
    anuallyPrice: { type: Number },
    active: { type: Boolean },
    feature: { type: Array },
    planImage: logoSchema,
})

/**
 * ## Model : `Subscription`
 */
module.exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model('Subscription', subscriptionSchema);
}
