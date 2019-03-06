const userSubscriptionAudtSchema = require("../client/userManagement/userSubscription")
  .userSubscriptionSchema;
const dbConfig = require("../../config/dbConfig");

module.exports.getModel = function(database) {
  let connection = dbConfig.connect(database);
  return connection.model("UserSubscriptionAudit", userSubscriptionAudtSchema);
};
