"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var ValidationError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ValidationError, _Error);

  function ValidationError(error) {
    var _this;

    (0, _classCallCheck2["default"])(this, ValidationError);
    var errorMessage = getRecentMessage(error);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ValidationError).call(this, errorMessage));
    _this.name = "ValidationError";
    return _this;
  }

  (0, _createClass2["default"])(ValidationError, [{
    key: "getStatusCode",
    value: function getStatusCode() {
      return 422;
    }
  }]);
  return ValidationError;
}((0, _wrapNativeSuper2["default"])(Error));

var getRecentMessage = function getRecentMessage(error) {
  try {
    var errorMessage = JSON.parse(error);
    return errorMessage[0]["msg"];
  } catch (err) {
    return error;
  }
};

module.exports = ValidationError;