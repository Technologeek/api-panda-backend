const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/UserController"),
  passport = require("passport")
require("../middlewares/passport")(passport)

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

router.get(
  "/collections",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({ Success: "Success signing token" })
  }
)
module.exports = router
