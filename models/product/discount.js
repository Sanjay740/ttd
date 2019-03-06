const mongoose = require("mongoose");
const Schema =
  mongoose.Schema; /** capital s is taken from mongoose offical website*/
const dbConfig = require("../../config/dbConfig");
const discountSchema = new Schema({
  value: { type: Number, default: 0 },
  effectiveDate: { type: Date }
});

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("Discount", discountSchema);
};
