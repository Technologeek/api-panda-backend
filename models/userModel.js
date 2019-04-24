const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  { comparePasswordHash } = require("../utils/hashPassword")

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

UserSchema.methods.comparePassword = async plainPassword => {
  await comparePasswordHash(plainPassword)
}

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", UserSchema)
