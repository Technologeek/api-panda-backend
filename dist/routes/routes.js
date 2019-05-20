"use strict";

var express = require("express"),
    router = express.Router(),
    authRoutes = require("./authRoutes"),
    userRoutes = require("./userRoutes"),
    collectionRoutes = require("./collectionRoutes"),
    passport = require("passport"),
    boom = require("express-boom");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/collections", collectionRoutes);
router.use("/", passport.initialize());
router.use("/", boom);
module.exports = router;