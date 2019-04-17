const express = require("express"),
  router = express.Router(),
  SignUpUser = require("../controllers/UserController")

router.post("/signup", SignUpUser.registerNewUser)
module.exports = router
