"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CollectionImageSchema = new Schema({
  imagename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
var CollectionSchema = new Schema({
  collectionname: {
    type: String,
    required: [true, "Collection Name is Required"]
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: [true, "UserId is Required"],
    ref: "User"
  },
  url: {
    type: String
  },
  method: {
    type: String,
    required: true
  },
  urls: [{
    name: String,
    method: String
  }],
  imageDetails: [CollectionImageSchema]
});
/*
 Please refer 
  https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
  for these lines
 */

module.exports = mongoose.models.Collections || mongoose.model("Collections", CollectionSchema);