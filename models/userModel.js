const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  { comparePasswordHash } = require("../utils/hashPassword")
const bcrypt = require("bcrypt")
const CollectionSchema = require("../models/collectionModel")

const UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 100, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

UserSchema.plugin(uniqueValidator)

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model("User", UserSchema)
