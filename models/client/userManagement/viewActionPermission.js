const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const screenTypes = require("../common/enum");

let viewPartSchema = new Schema({
  name: { type: String },
  access: { type: String, enum: screenTypes.permissionTypes },
});

let viewActionPermissionSchema = new Schema({
  name: { type: String },
  readOnly: { type: Boolean },
  access: { type: String, enum: screenTypes.permissionTypes },
  viewParts: [viewPartSchema],
});

exports.viewActionPermissionSchema = viewActionPermissionSchema;
