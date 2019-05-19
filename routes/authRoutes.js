import Validation from "./../validation/user"
import validationMiddleware from "./../middlewares/Validation"
const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/UserController"),
  passport = require("passport")
const { checkSchema } = require("express-validator/check")
const promiseResolver = require("./../middlewares/promiseResolver")
const responseSender = require("./../middlewares/responseSender")

require("../middlewares/passport")(passport)

router.post(
  "/signup",
  checkSchema(Validation.signUpValidation()),
  validationMiddleware,
  promiseResolver(UserController.registerNewUser),
  responseSender
)

router.post(
  "/login",
  checkSchema(Validation.loginValidation()),
  validationMiddleware,
  promiseResolver(UserController.loginUser),
  responseSender
)

module.exports = router
