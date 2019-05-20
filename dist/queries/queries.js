"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var User = require("../models/userModel");

var jwt = require("jsonwebtoken");

var blueBird = require("bluebird");

var promisedJWT = blueBird.promisify(jwt.sign);

var createNewUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username, email, password) {
    var UserModel, user, userDetails, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UserModel = new User({
              username: username,
              email: email,
              password: password
            });
            _context.next = 3;
            return UserModel.save();

          case 3:
            user = _context.sent;
            userDetails = {
              userID: user._id,
              userEmail: email
            };
            _context.next = 7;
            return promisedJWT(userDetails, process.env.JWT_ENCRYPTION_KEY, {
              algorithm: "HS256",
              expiresIn: 36000
            });

          case 7:
            token = _context.sent;
            return _context.abrupt("return", {
              userId: userDetails.userID,
              email: userDetails.userEmail,
              token: token
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNewUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var loginExistingUser =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(email, password) {
    var user, isMatch, userDetails, generatedToken, responseToSend;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              email: email
            });

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return user.comparePassword(password);

          case 5:
            isMatch = _context2.sent;

            if (!isMatch) {
              _context2.next = 13;
              break;
            }

            userDetails = {
              userID: user._id,
              userEmail: user.email
            };
            _context2.next = 10;
            return promisedJWT(userDetails, process.env.JWT_ENCRYPTION_KEY, {
              algorithm: "HS256",
              expiresIn: 36000
            });

          case 10:
            generatedToken = _context2.sent;
            responseToSend = {
              token: generatedToken,
              userId: userDetails.userID,
              email: user.email
            };
            return _context2.abrupt("return", responseToSend);

          case 13:
            throw new Error("Incorrect Password");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loginExistingUser(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserInformation =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(payload) {
    var userInformation;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne(payload);

          case 2:
            userInformation = _context3.sent;
            return _context3.abrupt("return", userInformation);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserInformation(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  createNewUser: createNewUser,
  loginExistingUser: loginExistingUser,
  getUserInformation: getUserInformation
};