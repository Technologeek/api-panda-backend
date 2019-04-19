const hashPassword = require("../utils/hashPassword")
const { body, validationResult } = require("express-validator/check")
const createNewUser = require("../queries/queries")

const UserController = {
  validate: method => {
    switch (method) {
      case "registerNewUser": {
        return [
          body("username", "UserName must be unqiue & not empty").exists(),
          body("email", "Invalid email Format")
            .exists()
            .isEmail(),
          body(
            "password",
            "Password must be min 8 char long,have one uppercase,one lower case and one special character."
          ).exists()
          // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        ]
      }
    }
  },
  registerNewUser: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    let { username, email, password } = req.body
    let encrypted_password = await hashPassword(password)
    await createNewUser(username, email, encrypted_password, res, req, next)
  }
}
module.exports = UserController
