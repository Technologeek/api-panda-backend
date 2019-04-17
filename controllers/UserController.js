const User = require("../models/userModel")

const SignUpUser = {
  registerNewUser: (req, res, next) => {
    console.log(req.body.username)
    let UserModel = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    UserModel.save(error => {
      if (error) {
        return next(error)
      }
      res.send("Product Created successfully")
    })
  }
}
module.exports = SignUpUser
