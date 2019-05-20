"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uniqueValidator = require("mongoose-unique-validator"),
    _require = require("../utils/hashPassword"),
    comparePasswordHash = _require.comparePasswordHash;

var bcrypt = require("bcrypt"); //User=Schema


var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 100,
    unique: [true, "Username Already Exists"]
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: "Collections"
  }]
}, {
  timestamps: true
});
UserSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);