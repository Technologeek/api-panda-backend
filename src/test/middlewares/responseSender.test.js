const chai = require("chai"),
  expect = require("chai").expect
var sinon = require("sinon")

const responseSender = require("./../../middlewares/responseSender")

describe("responseSender middleware", function() {
  it("should be a function", function() {
    expect(responseSender).to.be.a("function")
  })
  it("should sends the response and status", function() {
    const responseObject = {
      data: "testing"
    }
    const responseStatus = 202
    const req = {
      responseObject,
      responseStatus
    }
    const send = sinon.spy()
    const status = sinon.stub().returns({ send })
    const res = {
      status,
      send
    }
    const next = sinon.spy()
    responseSender(req, res, next)
    expect(next.calledOnce).to.equal(true)
    expect(res.status.calledOnce).to.equal(true)
    expect(send.calledOnce).to.equal(true)
    expect(status.calledWith(responseStatus)).to.equal(true)
    const message = {
      body: responseObject,
      success: true,
      status: responseStatus
    }
    expect(send.calledWith(message)).to.equal(true)
  })
})
