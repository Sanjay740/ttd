const mongoose = require("mongoose");
const Schema =
  mongoose.Schema; /** capital s is taken from mongoose offical website*/

const dbConfig = require("../../config/dbConfig");

const subFeatureSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  editable: { type: Boolean },
  id: { type: Number }
});

const featureSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  price: { type: Number },
  imagePath: { type: String },
  editable: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
  subFeatures: [subFeatureSchema]
});

exports.featureSchema = featureSchema;

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Feature", featureSchema);
};
