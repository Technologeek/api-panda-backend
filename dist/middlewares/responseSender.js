"use strict";

module.exports = function (req, res, next) {
  var message = {};
  message.body = req.responseObject;
  message.success = true;
  message.status = req.responseStatus || 200;
  res.status(message.status).send(message);
  return next();
};