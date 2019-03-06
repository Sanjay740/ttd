const mongoose = require('mongoose')
const addressSchema = require('../common/address')
const personSchema = require('./person')
// const TYPES = require('../common/Types').Types

// PayOffLender and Lender are quite same in structure in background.
const lenderSchema = new mongoose.Schema({
    name: { type: String },
    address: { addressSchema },
    phone: { type: String },
    fax: { type: String },
    email: { type: String, index: true },
    persons: [personSchema],
    Type: { type: String },
    mortgageAmount: { type: String }, // TODO: it needs to be decimal , find out the way soon to sort it out.
    mortgageBook: { type: String },
    mortgagePage: { type: String }
})

module.exports = lenderSchema