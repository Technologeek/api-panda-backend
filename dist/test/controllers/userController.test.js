"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var expect = require("chai").expect;

var sinon = require("sinon");

var userControllerFileLocation = "./../../controllers/UserController";

var UserController = require(userControllerFileLocation);

var Utils = require("./../../utils/hashPassword");

var queries = require("./../../queries/queries");

describe("testing User Schema Model", function () {
  var hashPasswordStub, loginExistingUserStub, createNewUserStub;
  before(function () {
    hashPasswordStub = sinon.stub(Utils, "hashPassword");
    createNewUserStub = sinon.stub(queries, "createNewUser");
    loginExistingUserStub = sinon.stub(queries, "loginExistingUser");
  });
  after(function () {
    queries.createNewUser.restore();
    queries.loginExistingUser.restore();
    Utils.hashPassword.restore();
  });
  it("should test registerNewUser function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var body, encryptedString, userResponse, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = {
              username: "rahul",
              email: "rahulanandpatil@gmail.com",
              password: "password"
            };
            encryptedString = "randomString";
            userResponse = (0, _objectSpread2["default"])({
              _id: 123234
            }, body);
            hashPasswordStub.resolves(encryptedString);
            createNewUserStub.resolves(userResponse);
            _context.next = 7;
            return UserController.registerNewUser({
              body: body
            });

          case 7:
            response = _context.sent;
            expect(userResponse).to.equal(response);
            expect(hashPasswordStub.called).to.be["true"];
            expect(hashPasswordStub.getCall(0).args[0]).to.equal(body.password);
            expect(createNewUserStub.getCall(0).args[0]).to.equal(body.username);
            expect(createNewUserStub.getCall(0).args[1]).to.equal(body.email);
            expect(createNewUserStub.getCall(0).args[2]).to.equal(encryptedString);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should test loginNewUser function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var body, userResponse, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {
              email: "rahulanandpatil@gmail.com",
              password: "password"
            };
            userResponse = (0, _objectSpread2["default"])({
              _id: 123234
            }, body);
            loginExistingUserStub.resolves(userResponse);
            _context2.next = 5;
            return UserController.loginUser({
              body: body
            });

          case 5:
            response = _context2.sent;
            expect(userResponse).to.equal(response);
            expect(loginExistingUserStub.called).to.be["true"];
            expect(loginExistingUserStub.getCall(0).args[0]).to.equal(body.email);
            expect(loginExistingUserStub.getCall(0).args[1]).to.equal(body.password);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});