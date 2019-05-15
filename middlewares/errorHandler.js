const errorHandler = (err, req, res, next) => {
  console.log(err.stack)
  if (err && err.errors && err.errors.username) {
    res.status(400).send(err)
  } else {
    res.status(500).send(err)
  }
}
module.exports = errorHandler
