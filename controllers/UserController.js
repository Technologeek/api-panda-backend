const Utils = require("../utils/hashPassword")
const queries = require("../queries/queries")
const UserController = {
  registerNewUser: async ({ body }) => {
    let { username, email, password } = body
    let encrypted_password = await Utils.hashPassword(password)
    const userResponse = await queries.createNewUser(
      username,
      email,
      encrypted_password
    )
    return userResponse
  },

  loginUser: async ({ body }) => {
    let { email, password } = body
    const response = await queries.loginExistingUser(email, password)
    return response
  },

  getUserInformation: async ({ params }) => {
    const { userid } = params
    let query = params
    if (userid) {
      query._id = query.userid
      delete query.userid
    }
    const response = (await queries.getUserInformation(query)) || {}
    return response
  }
}
module.exports = UserController
