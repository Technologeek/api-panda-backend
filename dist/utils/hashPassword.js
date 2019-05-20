"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var bcrypt = require("bcrypt");

var saltRounds = 10;

var hashPassword =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(password) {
    var hashedPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
              });
            });

          case 2:
            hashedPassword = _context.sent;
            return _context.abrupt("return", hashedPassword);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

var comparePasswordHash =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(plainPassword) {
    var passwordFlag;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              console.log(plainPassword);
              bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
                if (err) reject(err);
                resolve(isMatch);
              });
            });

          case 2:
            passwordFlag = _context2.sent;
            return _context2.abrupt("return", passwordFlag);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function comparePasswordHash(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  hashPassword: hashPassword,
  comparePasswordHash: comparePasswordHash
};