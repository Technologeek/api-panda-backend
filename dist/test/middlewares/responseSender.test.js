"use strict";

var chai = require("chai"),
    expect = require("chai").expect;

var sinon = require("sinon");

var responseSender = require("./../../middlewares/responseSender");

describe("responseSender middleware", function () {
  it("should be a function", function () {
    expect(responseSender).to.be.a("function");
  });
  it("should sends the response and status", function () {
    var responseObject = {
      data: "testing"
    };
    var responseStatus = 202;
    var req = {
      responseObject: responseObject,
      responseStatus: responseStatus
    };
    var send = sinon.spy();
    var status = sinon.stub().returns({
      send: send
    });
    var res = {
      status: status,
      send: send
    };
    var next = sinon.spy();
    responseSender(req, res, next);
    expect(next.calledOnce).to.equal(true);
    expect(res.status.calledOnce).to.equal(true);
    expect(send.calledOnce).to.equal(true);
    expect(status.calledWith(responseStatus)).to.equal(true);
    var message = {
      body: responseObject,
      success: true,
      status: responseStatus
    };
    expect(send.calledWith(message)).to.equal(true);
  });
});