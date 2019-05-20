const express = require("express"),
  router = express.Router(),
  authRoutes = require("./authRoutes"),
  userRoutes = require("./userRoutes"),
  collectionRoutes = require("./collectionRoutes"),
  miscRoutes = require("./miscRoutes"),
  passport = require("passport"),
  boom = require("express-boom")

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/collections", collectionRoutes)
router.use("/", miscRoutes)
router.use("/", passport.initialize())
//HealthCheck Route
router.get("/health", (req, res) => {
  res.send("ok")
})
router.use("/", boom)
module.exports = router
