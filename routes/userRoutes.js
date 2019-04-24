const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/UserController")

router.post(
  "/signup",
  UserController.validate("registerNewUser"),
  UserController.registerNewUser
)

router.post(
  "/login",
  UserController.validate("loginUser"),
  UserController.loginUser
)
module.exports = router
