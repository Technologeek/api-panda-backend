const express = require("express"),
  router = express.Router(),
  userRouter = require("./userRoutes")

router.use("/", userRouter)

module.exports = router
