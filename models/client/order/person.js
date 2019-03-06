const mongoose = require('mongoose')
const addressSchema = require("../common/address");
const Schema = mongoose.Schema /** capital s is taken from mongoose offical website*/

const personSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  address: addressSchema,
  fax: { type: String },
  email: { type: String },
  title: { type: String },
  cell: { type: String },
  licenceNumber: { type: String },
  dob: { type: Date },
  ssn: { type: String }
})

module.exports.personSchema = personSchema