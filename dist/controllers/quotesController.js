"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var request = require("request");

var quotesController = {
  makeQuoteRequest: function () {
    var _makeQuoteRequest = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return request("http://quotes.stormconsultancy.co.uk/random.json", function (error, response, body) {
                if (!error) {
                  res.status(200).send(body);
                } else {
                  res.status(400).send("Error : Problem Fetching Quotes");
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function makeQuoteRequest(_x, _x2, _x3) {
      return _makeQuoteRequest.apply(this, arguments);
    }

    return makeQuoteRequest;
  }()
};
module.exports = quotesController;