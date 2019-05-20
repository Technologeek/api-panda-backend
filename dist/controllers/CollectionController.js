"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("../queries/Collections"),
    _searchCollection = _require.searchCollection,
    getCollectionById = _require.getCollectionById,
    getRecentCollection = _require.getRecentCollection;

var queries = require("./../queries/Collections");

var CollectionController = {
  createNewCollection: function () {
    var _createNewCollection = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref) {
      var body, user_id, collectionname, description, url, method, urls, imageDetails, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = _ref.body;
              user_id = body.user_id, collectionname = body.collectionname, description = body.description, url = body.url, method = body.method, urls = body.urls, imageDetails = body.imageDetails;
              _context.next = 4;
              return queries.createNewCollection(user_id, collectionname, description, url, method, urls, imageDetails);

            case 4:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function createNewCollection(_x) {
      return _createNewCollection.apply(this, arguments);
    }

    return createNewCollection;
  }(),
  readAllUserCollections: function () {
    var _readAllUserCollections = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref2) {
      var params, userid, userData;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = _ref2.params;
              userid = params.userid;
              _context2.next = 4;
              return queries.readUserCollection(userid);

            case 4:
              userData = _context2.sent;
              return _context2.abrupt("return", userData);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function readAllUserCollections(_x2) {
      return _readAllUserCollections.apply(this, arguments);
    }

    return readAllUserCollections;
  }(),
  updateCollection: function () {
    var _updateCollection = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref3) {
      var body, params, collectionId, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              body = _ref3.body, params = _ref3.params;
              collectionId = params.collectionId;
              _context3.next = 4;
              return queries.updateUserCollection(collectionId, body);

            case 4:
              result = _context3.sent;
              return _context3.abrupt("return", {
                message: "Collection has been updated",
                data: result
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function updateCollection(_x3) {
      return _updateCollection.apply(this, arguments);
    }

    return updateCollection;
  }(),
  removeCollection: function () {
    var _removeCollection = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(_ref4) {
      var params, collectionId, response;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = _ref4.params;
              collectionId = params.collectionId;
              _context4.next = 4;
              return queries.removeUserCollection(collectionId);

            case 4:
              response = _context4.sent;
              return _context4.abrupt("return", response);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function removeCollection(_x4) {
      return _removeCollection.apply(this, arguments);
    }

    return removeCollection;
  }(),
  searchCollection: function () {
    var _searchCollection2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(_ref5) {
      var params, userid, searchText, searchObject, searchResult;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = _ref5.params;
              userid = params.userid, searchText = params.searchText;
              searchObject = {
                collectionname: {
                  $regex: searchText,
                  $options: "i"
                }
              };
              if (userid) searchObject.user_id = userid;
              _context5.next = 6;
              return _searchCollection(searchObject);

            case 6:
              searchResult = _context5.sent;
              return _context5.abrupt("return", searchResult);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function searchCollection(_x5) {
      return _searchCollection2.apply(this, arguments);
    }

    return searchCollection;
  }(),
  collectionById: function () {
    var _collectionById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(_ref6) {
      var params, collectionId, result;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = _ref6.params;
              collectionId = params.collectionId;
              _context6.next = 4;
              return getCollectionById(collectionId);

            case 4:
              result = _context6.sent;
              return _context6.abrupt("return", result);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function collectionById(_x6) {
      return _collectionById.apply(this, arguments);
    }

    return collectionById;
  }(),
  recentCollection: function () {
    var _recentCollection = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(_ref7) {
      var _ref7$param, param, userId, recentCollection, result;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ref7$param = _ref7.param, param = _ref7$param === void 0 ? {} : _ref7$param;
              userId = param.userId;
              recentCollection = {};
              if (userId) recentCollection.user_id = userId;
              _context7.next = 6;
              return getRecentCollection(recentCollection);

            case 6:
              result = _context7.sent;
              return _context7.abrupt("return", result);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function recentCollection(_x7) {
      return _recentCollection.apply(this, arguments);
    }

    return recentCollection;
  }()
};
module.exports = CollectionController;