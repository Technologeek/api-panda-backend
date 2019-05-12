const express = require("express"),
  router = express.Router(),
  userRouter = require("./userRoutes"),
  collectionRouter = require("./collectionRoutes"),
  passport = require("passport"),
  boom = require("express-boom")

router.use("/", userRouter)
router.use("/", collectionRouter)
router.use("/", passport.initialize())
router.use("/", boom)
module.exports = router
