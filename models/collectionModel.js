const mongoose = require("mongoose"),
  Schema = mongoose.Schema

const CollectionImageSchema = new Schema({
  imagename: { type: String, required: true },
  url: { type: String, required: true }
})
const CollectionSchema = new Schema({
  collectionname: { type: String, required: true },
  description: { type: String, required: true },
  user_id: {
    type: String,
    required: true,
    ref: "User"
  },
  url: { type: String },
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
