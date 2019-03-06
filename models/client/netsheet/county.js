const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const dbConfig = require("../../../config/dbConfig");

const countySchema = new mongoose.Schema({
  name: { type: String, index: 1 },
  active: { type: Boolean }
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
