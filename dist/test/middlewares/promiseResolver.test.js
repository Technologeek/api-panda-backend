"use strict";

var chai = require("chai"),
    expect = require("chai").expect;

var sinon = require("sinon");

var promiseResolver = require("./../../middlewares/promiseResolver");

describe("promiseResolver middleware", function () {
  it("should return function", function () {
    var fakeFunction = sinon.spy();
    promiseResolver(fakeFunction);
    expect(promiseResolver).to.be.a("function");
  });
  it("should throw error if not the function", function () {
    var dummyFunction = "text";
    expect(function () {
      return promiseResolver(dummyFunction);
    }).to["throw"](/Function required/);
  });
  it("should run in success path", function (done) {
    var data = {
      sampleData: "testing"
    };
    var resolveStub = sinon.stub().resolves(data);
    var middleware = promiseResolver(resolveStub);
    var req = {},
        res = {},
        next = sinon.spy();
    middleware(req, res, next);
    expect(resolveStub.calledOnce).to.equal(true);
    resolveStub().then(function () {
      expect(next.calledOnce).to.equal(true);
      expect(req).to.have.property("responseObject");
      expect(req.responseObject).to.equal(data);
      done();
    });
  });
});