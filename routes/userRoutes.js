const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/UserController")

router.post(
  "/signup",
  UserController.validate("registerNewUser"),
  UserController.registerNewUser
)
module.exports = router
