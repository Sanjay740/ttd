const mongoose = require("mongoose");
const viewActionPermissionSchema = require("./viewActionPermission").viewActionPermissionSchema;
let dbConfig = require("../../../config/dbConfig");

const Schema = mongoose.Schema;

let userGroupSchema = new Schema({
  name: { type: String },
  views: [viewActionPermissionSchema],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }] // objectids of users.
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("UserGroup", userGroupSchema);
};
