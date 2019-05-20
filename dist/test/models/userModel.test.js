"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var chai = require("chai"),
    expect = require("chai").expect;

var sinon = require("sinon");

var bcrypt = require("bcrypt");

var User = require("./../../models/userModel");

describe("testing User Schema Model", function () {
  it("should not throw error and get Accepted with min required Schema fields", function () {
    var userObject = new User({
      username: "testing",
      email: "testing@test.com",
      password: "rahulpatil"
    });
    userObject.validate(function (error, data) {
      expect(error).to.equal(null);
    });
  });
  it("checks for comparePassword",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var userObject, randomString, newCompare, output;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userObject = new User({
              username: "testing",
              email: "testing@test.com",
              password: "rahul123"
            });
            randomString = "randomString";
            newCompare = sinon.stub(bcrypt, "compare");
            newCompare.returns(randomString);
            _context.next = 6;
            return userObject.comparePassword(randomString);

          case 6:
            output = _context.sent;
            expect(output).to.equal(randomString);
            expect(newCompare.called).to.be["true"];
            expect(newCompare.getCall(0).args[0]).to.equal(randomString);
            expect(newCompare.getCall(0).args[1]).to.equal(userObject.password);
            bcrypt.compare.restore();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});