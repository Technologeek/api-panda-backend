"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _user = _interopRequireDefault(require("./../validation/user"));

var _Validation = _interopRequireDefault(require("./../middlewares/Validation"));

var express = require("express"),
    router = express.Router(),
    UserController = require("../controllers/UserController"),
    passport = require("passport");

var _require = require("express-validator/check"),
    checkSchema = _require.checkSchema;

var promiseResolver = require("./../middlewares/promiseResolver");

var responseSender = require("./../middlewares/responseSender");

require("../middlewares/passport")(passport);

router.post("/signup", checkSchema(_user["default"].signUpValidation()), _Validation["default"], promiseResolver(UserController.registerNewUser), responseSender);
router.post("/login", checkSchema(_user["default"].loginValidation()), _Validation["default"], promiseResolver(UserController.loginUser), responseSender);
module.exports = router;