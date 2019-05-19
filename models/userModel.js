const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  { comparePasswordHash } = require("../utils/hashPassword")
const bcrypt = require("bcrypt")

//User=Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max: 100,
      unique: [true, "Username Already Exists"]
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collections"
      }
    ]
  },
  {
    timestamps: true
  }
)

UserSchema.plugin(uniqueValidator, {
  message: `{PATH} must be unique`
})

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
