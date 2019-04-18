const User = require("../models/userModel")
const { body, validationResult } = require("express-validator/check")

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
          )
            .exists()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        ]
      }
    }
  },
  registerNewUser: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { username, email, password } = req.body
    let UserModel = new User({
      username: username,
      email: email,
      password: password
    })
    UserModel.save(error => {
      if (error) {
        return next(error)
      }
      res.send("Product Created successfully")
    })
  }
}
module.exports = UserController
