const mongoose = require("mongoose");
const dbConfig = require("../../../config/dbConfig");
const mongoosePaginate = require("mongoose-paginate");

/* schema of configurable items */
const configurableItemsSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, index: 1 },
  value: { type: Number }
});
configurableItemsSchema.plugin(mongoosePaginate);

/**
 * ## Model : `ConfigurableItems`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("ConfigurableItems", configurableItemsSchema);
};
