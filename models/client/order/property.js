const mongoose = require('mongoose')
const Schema = mongoose.Schema /** capital s is taken from mongoose offical website*/

const PROPERTYTYPE = ['Unimproved Land', 'Owner Occupied', 'Leased', 'Rental', 'Existing Building - Over 90 Days', 'Recent Improvement/Repairs', 'Commercial']

var propertySchema = new Schema({
    propertyType: { type: String, enum: PROPERTYTYPE },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    zip: { type: String },
    state: { type: String },
    block: { type: String },
    lot: { type: String },
    county: { type: String },
    qualifier: { type: String }
})

module.exports.propertySchema = propertySchema
