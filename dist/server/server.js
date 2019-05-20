"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv").config();

var connectToDb = require("../config/dbConfig");

var errorHandler = require("../middlewares/errorHandler"),
    logger = require("../middlewares/logger"),
    boom = require("express-boom"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    routes = require("../routes/routes");

var express = require("express"),
    app = express(),
    morgan = require("morgan"); //Error Parser


app.use(boom()); //CORS

app.use(cors()); //Passport

app.use(passport.initialize()); //Morgan Logging

app.use(morgan("dev", {
  skip: function skip(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr
}));
app.use(morgan("dev", {
  skip: function skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout
})); //Body-Parser
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/json

app.use(bodyParser.json()); //Router

app.use("/api", routes); //Logger

app.use("*", function (req, res) {
  res.boom.notFound();
  console.log(req && req.username);
  logger.debug("Debug statement");
  logger.info("Info statement");
}); //Environment Settings

app.set("port", process.env.PORT || 3000);
connectToDb().then(
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app.listen(app.get("port"), function () {
            console.log("Node server Started @ " + new Date() + " Running on port no: " + app.get("port"));
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
app.use(errorHandler);
module.exports = app;