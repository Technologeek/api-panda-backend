const express = require("express"),
  router = express.Router(),
  CollectionController = require("../controllers/CollectionController"),
  passport = require("passport")
require("../middlewares/passport")(passport)

router.put(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  CollectionController.updateCollection
)

router.delete(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  CollectionController.removeCollection
)

module.exports = router
