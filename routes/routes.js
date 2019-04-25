const express = require("express"),
  router = express.Router(),
  userRouter = require("./userRoutes"),
  passport = require("passport")

router.use("/", userRouter)
router.use("/", passport.initialize())
module.exports = router
