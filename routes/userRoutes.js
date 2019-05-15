const express = require("express"),
  router = express.Router(),
  CollectionController = require("../controllers/CollectionController"),
  passport = require("passport")
require("../middlewares/passport")(passport)

router.post(
  "/:userid/collections",
  passport.authenticate("jwt", { session: false }),
  CollectionController.createNewCollection
)

router.get(
  "/:userid/collections",
  passport.authenticate("jwt", { session: false }),
  CollectionController.readAllUserCollections
)
module.exports = router
