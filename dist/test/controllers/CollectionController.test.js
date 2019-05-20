"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var expect = require("chai").expect;

var sinon = require("sinon");

var CollectionControllers = require("./../../controllers/CollectionController");

var queries = require("./../../queries/Collections");

describe("testing User Schema Model", function () {
  var createNewCollectionStub, readUserCollectionStub, updateCollectionStub, removeCollectionStub;
  before(function () {
    createNewCollectionStub = sinon.stub(queries, "createNewCollection");
    readUserCollectionStub = sinon.stub(queries, "readUserCollection");
    updateCollectionStub = sinon.stub(queries, "updateUserCollection");
    removeCollectionStub = sinon.stub(queries, "removeUserCollection");
  });
  after(function () {
    queries.createNewCollection.restore();
    queries.readUserCollection.restore();
    queries.updateUserCollection.restore();
    queries.removeUserCollection.restore();
  });
  it("should test createNewCollection function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var body, userResponse, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = {
              user_id: 12343,
              collectionname: "testing",
              description: "testing Descriptions",
              url: "http://testing.co",
              method: "get",
              urls: "http://testing.co",
              imageDetails: "opop"
            };
            userResponse = {
              user_id: 1222
            };
            createNewCollectionStub.resolves(userResponse);
            _context.next = 5;
            return CollectionControllers.createNewCollection({
              body: body
            });

          case 5:
            response = _context.sent;
            expect(userResponse).to.equal(response);
            expect(createNewCollectionStub.called).to.be["true"];
            expect(createNewCollectionStub.getCall(0).args[0]).to.equal(body.user_id);
            expect(createNewCollectionStub.getCall(0).args[3]).to.equal(body.url);
            expect(createNewCollectionStub.getCall(0).args[1]).to.equal(body.collectionname);
            expect(createNewCollectionStub.getCall(0).args[2]).to.equal(body.description);
            expect(createNewCollectionStub.getCall(0).args[4]).to.equal(body.method);
            expect(createNewCollectionStub.getCall(0).args[5]).to.equal(body.urls);
            expect(createNewCollectionStub.getCall(0).args[6]).to.equal(body.imageDetails);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should test readAllUserCollections function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var params, userResponse, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {
              userid: "123423"
            };
            userResponse = (0, _objectSpread2["default"])({
              _id: 123234
            }, params);
            readUserCollectionStub.resolves(userResponse);
            _context2.next = 5;
            return CollectionControllers.readAllUserCollections({
              params: params
            });

          case 5:
            response = _context2.sent;
            expect(userResponse).to.equal(response);
            expect(readUserCollectionStub.called).to.be["true"];
            expect(readUserCollectionStub.getCall(0).args[0]).to.equal(params.userid);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("should test updateCollection function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var params, body, userResponse, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = {
              collectionId: "123423"
            };
            body = {
              testingData: 1234
            };
            userResponse = (0, _objectSpread2["default"])({
              _id: 123234
            }, params, body);
            updateCollectionStub.resolves(userResponse);
            _context3.next = 6;
            return CollectionControllers.updateCollection({
              params: params,
              body: body
            });

          case 6:
            response = _context3.sent;
            expect(updateCollectionStub.called).to.be["true"];
            expect(updateCollectionStub.getCall(0).args[0]).to.equal(params.collectionId);
            expect(updateCollectionStub.getCall(0).args[1]).to.equal(body);
            expect(response).to.have.property("data");
            expect(response).to.have.property("message");
            expect(response.data).to.equal(userResponse);
            expect(response.message).to.equal("Collection has been updated");

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("should test removeCollection function",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var params, userResponse, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = {
              collectionId: "123423"
            };
            userResponse = (0, _objectSpread2["default"])({
              _id: 123234
            }, params);
            removeCollectionStub.resolves(userResponse);
            _context4.next = 5;
            return CollectionControllers.removeCollection({
              params: params
            });

          case 5:
            response = _context4.sent;
            expect(removeCollectionStub.called).to.be["true"];
            expect(removeCollectionStub.getCall(0).args[0]).to.equal(params.collectionId);
            expect(response).to.equal(userResponse);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});