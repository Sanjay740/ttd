const mongoose = require("mongoose");
const CONTACTTYPES = require("../common/contactTypes").contactTypes;
let dbConfig = require("../../../config/dbConfig");

const contactTypeSchema = new mongoose.Schema({
    contactName: { type: String, default: ' ' },
    roleId: { type: String, default: null },
    roleName: { type: String, enum: CONTACTTYPES },
});

exports.contactTypeSchema = contactTypeSchema;

exports.getModel = function (database) {
    let connection = dbConfig.connect(database);
    return connection.model("ContactType", contactTypeSchema);
};
