const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const CollectionImageSchema = new Schema({
  imagename: { type: String, required: true },
  url: { type: String, required: true }
})
const CollectionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true
  },
  collectionname: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  urls: [
    {
      name: String,
      method: String
    }
  ],
  imageDetails: [CollectionImageSchema]
})

module.exports = mongoose.model("Collections", CollectionSchema)
