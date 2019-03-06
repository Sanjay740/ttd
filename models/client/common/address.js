const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    zip: { type: String },
    state: { type: String }
})

module.exports = addressSchema;
