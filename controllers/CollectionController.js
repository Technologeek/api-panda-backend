const {
  searchCollection,
  getCollectionById,
  getRecentCollection
} = require("../queries/Collections")

const queries = require("./../queries/Collections")

const CollectionController = {
  createNewCollection: async ({ body }) => {
    let {
      user_id,
      collectionname,
      description,
      url,
      method,
      urls,
      imageDetails
    } = body
    const response = await queries.createNewCollection(
      user_id,
      collectionname,
      description,
      url,
      method,
      urls,
      imageDetails
    )
    return response
  },
  readAllUserCollections: async ({ params }) => {
    let { userid } = params
    const userData = await queries.readUserCollection(userid)
    return userData
  },
  updateCollection: async ({ body, params }) => {
    const { collectionId } = params
    const result = await queries.updateUserCollection(collectionId, body)
    return {
      message: "Collection has been updated",
      data: result
    }
  },
  removeCollection: async ({ params }) => {
    const { collectionId } = params
    const response = await queries.removeUserCollection(collectionId)
    return response
  },
  searchCollection: async ({ params }) => {
    const { userid, searchText } = params
    const searchObject = {
      collectionname: {
        $regex: searchText,
        $options: "i"
      }
    }
    if (userid) searchObject.user_id = userid
    const searchResult = await searchCollection(searchObject)
    return searchResult
  },
  collectionById: async ({ params }) => {
    const { collectionId } = params
    const result = await getCollectionById(collectionId)
    return result
  },
  recentCollection: async ({ param = {} }) => {
    const { userId } = param
    const recentCollection = {}
    if (userId) recentCollection.user_id = userId
    const result = await getRecentCollection(recentCollection)
    return result
  }
}
module.exports = CollectionController
