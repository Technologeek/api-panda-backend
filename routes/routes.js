const express = require("express"),
  router = express.Router()

router.get("/", (req, res) => {
  res.send("Hellow WORLD")
})
router.get("/getUsers", (req, res) => {
  res.send("List of Users")
})
module.exports = router
