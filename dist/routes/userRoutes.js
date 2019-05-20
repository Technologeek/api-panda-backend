"use strict";

var express = require("express"),
    router = express.Router(),
    CollectionController = require("../controllers/CollectionController"),
    userController = require("./../controllers/UserController"),
    passport = require("passport");

var promiseResolver = require("./../middlewares/promiseResolver");

var responseSender = require("./../middlewares/responseSender");

require("../middlewares/passport")(passport);

router.get("/email/:email", passport.authenticate("jwt", {
  session: false
}), promiseResolver(userController.getUserInformation), responseSender);
router.get("/username/:username", passport.authenticate("jwt", {
  session: false
}), promiseResolver(userController.getUserInformation), responseSender);
router.get("/:userid", passport.authenticate("jwt", {
  session: false
}), promiseResolver(userController.getUserInformation), responseSender);
router.post("/:userid/collections", passport.authenticate("jwt", {
  session: false
}), promiseResolver(CollectionController.createNewCollection), responseSender);
router.get("/:userid/collections", passport.authenticate("jwt", {
  session: false
}), promiseResolver(CollectionController.readAllUserCollections), responseSender);
router.get("/:userid/collections/recent-collection", passport.authenticate("jwt", {
  session: false
}), promiseResolver(CollectionController.recentCollection), responseSender);
router.get("/:userid/collections/search/:searchText", passport.authenticate("jwt", {
  session: false
}), promiseResolver(CollectionController.searchCollection), responseSender);
module.exports = router;