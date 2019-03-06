const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const dbConfig = require("../../config/dbConfig");

const countySchema = new mongoose.Schema({
  county: { type: String },
  state: { type: String }
});
// Set plugin for pagination
countySchema.plugin(mongoosePaginate);

/**
 * ## Model : `County`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("County", countySchema);
};
