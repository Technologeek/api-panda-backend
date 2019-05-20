"use strict";

var express = require("express"),
    router = express.Router(),
    QuotesController = require("../controllers/quotesController"),
    passport = require("passport");

require("../middlewares/passport")(passport);

router.get("/quote", QuotesController.makeQuoteRequest);
module.exports = router;