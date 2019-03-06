const mongoose = require("mongoose");
const viewActionPermissionSchema = require("./viewActionPermission").viewActionPermissionSchema;
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");

let roleSchema = new Schema({
  name: { type: String, required: true },
  // TODO: may be not needed.
  description: { type: String },
  isSystemRole: { type: Boolean },
  defaultView: { type: String },
  views: [viewActionPermissionSchema] // each role has assignment of screen where as a screen will have
});

// This collection will reside in Client database
module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("Role", roleSchema);
};
