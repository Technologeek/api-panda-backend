"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var chai = require("chai"),
    expect = require("chai").expect;

var CollectionSchema = require("./../../models/collectionModel");

describe("testing Collection Schema Model", function () {
  it("should throw error in case of non-required field",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var collection, value, collectionWithCollectionName, _value;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            collection = new CollectionSchema({});
            _context.prev = 1;
            _context.next = 4;
            return collection.validate();

          case 4:
            value = _context.sent;
            expect(value).to.equal(null);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            expect(_context.t0).to.not.equal(null);

          case 11:
            collectionWithCollectionName = new CollectionSchema({
              collectionname: "testing",
              user_id: "testing"
            });
            _context.prev = 12;
            _context.next = 15;
            return collectionWithCollectionName.validate();

          case 15:
            _value = _context.sent;
            expect(_value).to.equal(null);
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](12);
            expect(_context.t1).to.not.equal(null);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8], [12, 19]]);
  })));
  it("should not throw error and get Accepted with min required Schema fields", function (done) {
    var collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET"
    });
    collectionObject.validate(function (error, data) {
      expect(error).to.equal(null);
      done();
    });
  });
  it("should throw error when collectionImage Schema validation fails", function (done) {
    var collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET",
      imageDetails: {
        url: "http://testing/134"
      }
    });
    collectionObject.validate(function (error, data) {
      expect(error.name).to.exist;
      expect(error).to.not.equal(null);
      done();
    });
  });
  it("should throw error when collectionImage Schema validation fails", function (done) {
    var collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET",
      imageDetails: {
        url: "http://testing/134",
        imagename: "testing Image"
      }
    });
    collectionObject.validate(function (error, data) {
      expect(error).to.equal(null);
      done();
    });
  });
});