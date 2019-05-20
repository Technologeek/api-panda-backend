"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var userValidation =
/*#__PURE__*/
function () {
  function userValidation() {
    (0, _classCallCheck2["default"])(this, userValidation);
    this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    this.checkPassword = this.checkPassword.bind(this);
  }

  (0, _createClass2["default"])(userValidation, [{
    key: "checkPassword",
    value: function checkPassword(password) {
      return this.passwordRegex.test(password);
    }
  }, {
    key: "signUpValidation",
    value: function signUpValidation() {
      var _self = this;

      return {
        username: {
          "in": ["body"],
          errorMessage: "UserName must be unique & not empty",
          exists: true
        },
        email: {
          "in": ["body"],
          errorMessage: "Invalid email Format",
          isEmail: true,
          exists: true
        },
        password: {
          "in": ["body"],
          exists: true,
          errorMessage: "Password must be min 9 char long,have one uppercase,one lower case and one special character.",
          custom: {
            options: _self.checkPassword
          }
        }
      };
    }
  }, {
    key: "loginValidation",
    value: function loginValidation() {
      return {
        email: {
          "in": ["body"],
          errorMessage: "Invalid email Format",
          isEmail: true,
          exists: true
        },
        password: {
          "in": ["body"],
          exists: true,
          errorMessage: "Password must be min 9 char long,have one uppercase,one lower case and one special character.",
          custom: {
            options: this.checkPassword
          }
        }
      };
    }
  }]);
  return userValidation;
}();

module.exports = new userValidation();