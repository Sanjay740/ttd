const mongoose = require("mongoose");
const addressSchema = require("../common/address");
const viewActionPermissionSchema = require("./viewActionPermission").viewActionPermissionSchema;
const role = require("./role");
const Schema = mongoose.Schema;
let dbConfig = require("../../../config/dbConfig");
const imageSchema = require("../../common/image");

let userSchema = new Schema({
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  head: { type: Boolean },
  password: { type: String },
  isSystemUser: { type: Boolean, default: false }, // this wil make difference between system users and portal users.
  mobile: { type: String, default: "" },
  status: { type: String, default: "InActive" },
  homePhone: { type: String, default: "" },
  address: addressSchema,
  imageInfo: imageSchema,
  role: { type: Schema.Types.ObjectId, ref: "Role" },
  userGroups: [{ type: Schema.Types.ObjectId, ref: "UserGroup" }],
  views: [viewActionPermissionSchema]
});

module.exports.getModel = function (database) {
  let connection = dbConfig.connect(database);
  return connection.model("User", userSchema);
};
