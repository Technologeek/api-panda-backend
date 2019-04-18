const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})
UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", UserSchema)
