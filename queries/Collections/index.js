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
  imageDetails,
  res,
  req,
  next
) => {
  await new Promise((resolve, reject) => {
    let CollectionModel = new Collection({
      user_id,
      collectionname,
      description,
      url,
      method,
      urls,
      imageDetails
    })
    Promise.all([CollectionModel.save(), User.findById(user_id)])
      .then(([response, user]) => {
        const collectionId = response._id
        user.collections.push(collectionId)
        return user.save()
      })
      .then(data => resolve(res.status(200).send(JSON.stringify(data))))
      .catch(error => reject(next(error)))
  })
}

const readUserCollection = async (user_id, res, req, next, query) => {
  const { limit = 10, skip = 0 } = query
  delete query.limit
  delete query.skip
  await new Promise((resolve, reject) => {
    Collection.find({ user_id: ObjectID(user_id), ...query }, {})
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .then(data => resolve(res.status(200).send(JSON.stringify(data))))
  })
}
const updateUserCollection = async (collectionId, data) => {
  return Collection.findOneAndUpdate({ _id: ObjectID(collectionId) }, data)
}

const removeUserCollection = async collectionId => {
  return Collection.findById(collectionId).remove()
}
module.exports = {
  createNewCollection,
  readUserCollection,
  updateUserCollection,
  removeUserCollection
}
