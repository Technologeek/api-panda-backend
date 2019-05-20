const Validation = require("express-validator/check")
const ValidationError = require("./../errors/ValidationError")

module.exports = (req, res, next) => {
  const errors = Validation.validationResult(req)
  if (!errors.isEmpty()) {
    return next(new ValidationError(JSON.stringify(errors.array())))
  }
  return next()
}
