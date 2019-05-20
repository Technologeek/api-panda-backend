"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Utils = require("../utils/hashPassword");

var queries = require("../queries/queries");

var UserController = {
  registerNewUser: function () {
    var _registerNewUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var body, username, email, password, encrypted_password, userResponse;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = _ref.body;
              username = body.username, email = body.email, password = body.password;
              _context.next = 4;
              return Utils.hashPassword(password);

            case 4:
              encrypted_password = _context.sent;
              _context.next = 7;
              return queries.createNewUser(username, email, encrypted_password);

            case 7:
              userResponse = _context.sent;
              return _context.abrupt("return", userResponse);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function registerNewUser(_x) {
      return _registerNewUser.apply(this, arguments);
    }

    return registerNewUser;
  }(),
  loginUser: function () {
    var _loginUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var body, email, password, response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              body = _ref2.body;
              email = body.email, password = body.password;
              _context2.next = 4;
              return queries.loginExistingUser(email, password);

            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", response);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function loginUser(_x2) {
      return _loginUser.apply(this, arguments);
    }

    return loginUser;
  }(),
  getUserInformation: function () {
    var _getUserInformation = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref3) {
      var params, userid, query, response;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = _ref3.params;
              userid = params.userid;
              query = params;

              if (userid) {
                query._id = query.userid;
                delete query.userid;
              }

              _context3.next = 6;
              return queries.getUserInformation(query);

            case 6:
              _context3.t0 = _context3.sent;

              if (_context3.t0) {
                _context3.next = 9;
                break;
              }

              _context3.t0 = {};

            case 9:
              response = _context3.t0;
              return _context3.abrupt("return", response);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getUserInformation(_x3) {
      return _getUserInformation.apply(this, arguments);
    }

    return getUserInformation;
  }()
};
module.exports = UserController;