"use strict";

var Validation = require("express-validator/check");

var ValidationError = require("./../errors/ValidationError");

module.exports = function (req, res, next) {
  var errors = Validation.validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ValidationError(JSON.stringify(errors.array())));
  }

  return next();
};