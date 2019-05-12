const { body, validationResult } = require("express-validator/check")
const {
  createNewCollection,
  readUserCollection
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
    console.log(user_id)
    await readUserCollection(user_id, res, req, next)
  }
}
module.exports = CollectionController
