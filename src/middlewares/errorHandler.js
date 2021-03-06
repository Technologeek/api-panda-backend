// const boom = require("express-boom")
const errorHandler = (err, req, res, next) => {
  if (typeof err.getStatusCode === "function") {
    const statusCode = err.getStatusCode() || 422
    res.boom.boomify(err, { statusCode })
    return
  }

  if (err.name === "ValidationError") {
    res.boom.boomify(err, { statusCode: 422 })
    return
  }
  console.log(err)
  res.boom.boomify(err, { statusCode: 500, message: err.message })
}
module.exports = errorHandler
