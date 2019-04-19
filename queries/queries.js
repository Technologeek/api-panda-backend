const User = require("../models/userModel")

const createNewUser = async (username, email, password, res, req, next) => {
  const createUserQuery = await new Promise((resolve, reject) => {
    let UserModel = new User({
      username: username,
      email: email,
      password: password
    })
    UserModel.save((error, userId) => {
      if (error) {
        return reject(next(error))
      }
      resolve(res.status(200).send(JSON.stringify(userId._id)))
    })
  })
  return createUserQuery
}
module.exports = createNewUser
