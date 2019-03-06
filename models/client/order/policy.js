const mongoose = require('mongoose')
const Schema = mongoose.Schema /** capital s is taken from mongoose offical website*/

const policySchema = new Schema({
    amount: { type: String }, // this property is decimal
    policyType: {
        type: String,
        enum: ['Loan', 'Owners'],
        default: 'Loan' // Should we define a default policy type
    }
})

module.exports.policySchema = policySchema

