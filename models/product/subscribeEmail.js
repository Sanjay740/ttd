const mongoose = require("mongoose");
const dbConfig = require("../../config/dbConfig");

const emailSubscriberSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String }
});

/**
 * ## Model : `EmailSubscriber`
 */
module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("EmailSubscriber", emailSubscriberSchema);
};
