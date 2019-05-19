const express = require("express"),
  router = express.Router(),
  CollectionController = require("../controllers/CollectionController"),
  passport = require("passport")
const promiseResolver = require("./../middlewares/promiseResolver")
const responseSender = require("./../middlewares/responseSender")
require("../middlewares/passport")(passport)

router.get(
  "/recent-collection",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(CollectionController.recentCollection),
  responseSender
)

router.get(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(CollectionController.collectionById),
  responseSender
)

router.put(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(CollectionController.updateCollection),
  responseSender
)

router.get(
  "/search/:searchText",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(CollectionController.searchCollection),
  responseSender
)

router.delete(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(CollectionController.removeCollection),
  responseSender
)

module.exports = router
