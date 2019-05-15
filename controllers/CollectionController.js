const { body, validationResult } = require("express-validator/check")
const {
  createNewCollection,
  readUserCollection,
  updateUserCollection,
  removeUserCollection
} = require("../queries/Collections")

const CollectionController = {
  validate: method => {
    switch (method) {
      case "createNewCollection": {
        return [
          body("username", "UserName must be unqiue & not empty").exists(),
          body("email", "Invalid email Format")
            .exists()
            .isEmail(),
          body(
            "password",
            "Password must be min 8 char long,have one uppercase,one lower case and one special character."
          )
            .exists()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              "i"
            )
        ]
      }
      case "loginUser": {
        return [
          body("email", "Invalid email Format")
            .exists()
            .isEmail(),
          body(
            "password",
            "Password must be min 8 char long,have one uppercase,one lower case and one special character."
          )
            .exists()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              "i"
            )
        ]
      }
    }
  },
  createNewCollection: async (req, res, next) => {
    let {
      user_id,
      collectionname,
      description,
      url,
      method,
      urls,
      imageDetails
    } = req.body
    await createNewCollection(
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
    )
  },
  readAllUserCollections: async (req, res, next) => {
    let user_id = req.params.userid
    const query = req.query
    await readUserCollection(user_id, res, req, next, query)
  },
  updateCollection: async (req, res, next) => {
    const updateData = req.body
    const collectionId = req.params.collectionId
    const result = await updateUserCollection(collectionId, updateData)
    if (result)
      res.status(200).send({
        message: "User has been updated",
        data: updateData
      })
  },
  removeCollection: async (req, res, next) => {
    const collectionId = req.params.collectionId
    const response = await removeUserCollection(collectionId)
    if (response) res.status(200).send({})
  }
}
module.exports = CollectionController
