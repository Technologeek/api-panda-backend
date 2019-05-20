"use strict";

var expect = require("chai").expect;

var sinon = require("sinon");

var Validation = require("express-validator/check");

var ValidationMiddleware = require("./../../middlewares/Validation");

var ValidationError = require("./../../errors/ValidationError");

describe("responseSender middleware", function () {
  var validationStub, next, req, res, error, noError;
  before(function () {
    validationStub = sinon.stub(Validation, "validationResult");
    next = sinon.spy();
    req = {
      body: {}
    };
    res = {
      send: function send() {}
    };
    noError = {
      isEmpty: function isEmpty() {
        return true;
      },
      array: function array() {
        return [];
      }
    };
    error = {
      isEmpty: function isEmpty() {
        return false;
      },
      array: function array() {
        return [{
          error: true
        }];
      }
    };
  });
  it("should be a function", function () {
    expect(ValidationMiddleware).to.be.a("function");
  });
  it("should execute and callback with no parameter if no error is there", function () {
    validationStub.returns(noError);
    ValidationMiddleware(req, res, next);
    expect(next.calledOnce).to.be["true"];
  });
  it("should execute and call with error if there is validation error in the validation", function () {
    validationStub.returns(error);
    ValidationMiddleware(req, res, next);
    expect(next.called).to.be["true"];
    var calledWith = next.getCall(1).args[0];
    expect(calledWith).to.be.instanceOf(ValidationError);
  });
});