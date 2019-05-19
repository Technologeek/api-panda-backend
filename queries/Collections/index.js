const Collection = require("../../models/collectionModel")
const User = require("./../../models/userModel")
const ObjectID = require("mongodb").ObjectID

const createNewCollection = async (
  user_id,
  collectionname,
  description,
  url,
  method,
  urls,
  imageDetails
) => {
  let CollectionModel = new Collection({
    user_id,
    collectionname,
    description,
    url,
    method,
    urls,
    imageDetails
  })
  let [response, user] = await Promise.all([
    CollectionModel.save(),
    User.findById(user_id)
  ])
  const collectionId = response._id
  user.collections.push(collectionId)
  await user.save()
  return response
}

const readUserCollection = async (user_id, query = {}) => {
  // const {
  //   limit = 10,
  //   skip = 0
  // } = query
  // delete query.limit
  // delete query.skip
  const collectionData = await Collection.find({ user_id: ObjectID(user_id) })
  return collectionData
}
const updateUserCollection = async (collectionId, data) => {
  const response = await Collection.findOneAndUpdate(
    { _id: ObjectID(collectionId) },
    data
  )
  return response
}

const removeUserCollection = async collectionId => {
  const collectionResult = await Collection.findById(collectionId).remove()
  return collectionResult
}

const searchCollection = data => Collection.find(data)

const getCollectionById = _id => Collection.findById(_id)

const getRecentCollection = async data => {
  const response = await Collection.find(data).limit(10)
  return response
}

module.exports = {
  createNewCollection,
  readUserCollection,
  updateUserCollection,
  removeUserCollection,
  searchCollection,
  getCollectionById,
  getRecentCollection
}
