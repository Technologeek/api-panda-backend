module.exports = function(fn) {
  if (typeof fn !== "function") throw new Error("Function required")
  return function(req, res, next) {
    fn(req)
      .then(data => {
        req.responseObject = data
        next()
      })
      .catch(next)
  }
}
