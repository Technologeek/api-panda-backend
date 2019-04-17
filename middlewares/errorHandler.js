const boom = require("express-boom")
const errorHandler = (err, req, res, next) => {
  res.boom.badRequest("Validation didn't suceed")
  console.log(err.stack)
}
module.exports = errorHandler
