const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConfig = require('../../../../config/dbConfig')

const teamSchema = new Schema({
  roleId: { type: Schema.Types.ObjectId },
  name: { type: String }
})

const closingTeamSchema = new Schema({
  members: [teamSchema]
});

module.exports.closingTeamSchema = closingTeamSchema;

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("ClosingTeam", closingTeamSchema);
};

