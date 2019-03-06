const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConfig = require("../../../config/dbConfig");

let userSubscriptionSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() },
  status: { type: String, default: "Pending" },
  amount: { type: Number },
  selectedPeriod: { type: String },
  discount: { type: Number, default: 0 },
  features: [],
  paymentSuccessful: { type: Boolean },
  paymentMadeOn: { type: Date },
  deviceInfo: { type: Object },
  cardHolder: { type: String }
});

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("userSubscription", userSubscriptionSchema);
};

module.exports.userSubscriptionSchema = userSubscriptionSchema;
