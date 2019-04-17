const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true }
})
module.exports = mongoose.model("User", UserSchema)
