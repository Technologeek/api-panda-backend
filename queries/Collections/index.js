const Collection = require("../../models/collectionModel")
const ObjectID = require("mongodb").ObjectID
const mongoose = require("mongoose")

const createNewCollection = async (
  user_id,
  collectionname,
  description,
  url,
  method,
  urls,
  imageDetails,
  res,
  req,
  next
) => {
  const createCollectionQuery = await new Promise((resolve, reject) => {
    let CollectionModel = new Collection({
      user_id: user_id,
      collectionname: collectionname,
      description: description,
      url: url,
      method: method,
      urls: urls,
      imageDetails: imageDetails
    })
    CollectionModel.save((error, response) => {
      if (error) {
        return reject(next(error))
      }
      resolve(res.status(200).send(JSON.stringify(response)))
    })
  })
  return createCollectionQuery
}

const readUserCollection = async (user_id, res, req, next) => {
  const readUserCollectionsQuery = await new Promise((resolve, reject) => {
    Collection.find({ user_id }).exec((error, collections) => {
      if (error) {
        return reject(next(error))
      }
      let dataToReturn = {
        count: collections.length,
        collections: collections
      }
      resolve(res.status(200).send(JSON.stringify(dataToReturn)))
    })
  })
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>")
  return readUserCollectionsQuery
}
module.exports = { createNewCollection, readUserCollection }
