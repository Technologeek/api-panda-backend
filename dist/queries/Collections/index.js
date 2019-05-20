"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Collection = require("../../models/collectionModel");

var User = require("./../../models/userModel");

var ObjectID = require("mongodb").ObjectID;

var createNewCollection =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(user_id, collectionname, description, url, method, urls, imageDetails) {
    var CollectionModel, _ref2, _ref3, response, user, collectionId;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            CollectionModel = new Collection({
              user_id: user_id,
              collectionname: collectionname,
              description: description,
              url: url,
              method: method,
              urls: urls,
              imageDetails: imageDetails
            });
            _context.next = 3;
            return Promise.all([CollectionModel.save(), User.findById(user_id)]);

          case 3:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray2["default"])(_ref2, 2);
            response = _ref3[0];
            user = _ref3[1];
            collectionId = response._id;
            user.collections.push(collectionId);
            _context.next = 11;
            return user.save();

          case 11:
            return _context.abrupt("return", response);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNewCollection(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

var readUserCollection =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(user_id) {
    var query,
        collectionData,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.next = 3;
            return Collection.find({
              user_id: ObjectID(user_id)
            });

          case 3:
            collectionData = _context2.sent;
            return _context2.abrupt("return", collectionData);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function readUserCollection(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

var updateUserCollection =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(collectionId, data) {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Collection.findOneAndUpdate({
              _id: ObjectID(collectionId)
            }, data);

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateUserCollection(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var removeUserCollection =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(collectionId) {
    var collectionResult;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Collection.findById(collectionId).remove();

          case 2:
            collectionResult = _context4.sent;
            return _context4.abrupt("return", collectionResult);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removeUserCollection(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

var searchCollection = function searchCollection(data) {
  return Collection.find(data);
};

var getCollectionById = function getCollectionById(_id) {
  return Collection.findById(_id);
};

var getRecentCollection =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(data) {
    var response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Collection.find(data).limit(10);

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getRecentCollection(_x12) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports = {
  createNewCollection: createNewCollection,
  readUserCollection: readUserCollection,
  updateUserCollection: updateUserCollection,
  removeUserCollection: removeUserCollection,
  searchCollection: searchCollection,
  getCollectionById: getCollectionById,
  getRecentCollection: getRecentCollection
};