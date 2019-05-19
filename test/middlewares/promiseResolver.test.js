const chai = require("chai"),
  expect = require("chai").expect
var sinon = require("sinon")

const promiseResolver = require("./../../middlewares/promiseResolver")

describe("promiseResolver middleware", function() {
  it("should return function", function() {
    const fakeFunction = sinon.spy()
    promiseResolver(fakeFunction)
    expect(promiseResolver).to.be.a("function")
  })
  it("should throw error if not the function", function() {
    const dummyFunction = "text"
    expect(() => promiseResolver(dummyFunction)).to.throw(/Function required/)
  })
  it("should run in success path", function(done) {
    const data = {
      sampleData: "testing"
    }
    const resolveStub = sinon.stub().resolves(data)
    const middleware = promiseResolver(resolveStub)
    const req = {},
      res = {},
      next = sinon.spy()
    middleware(req, res, next)
    expect(resolveStub.calledOnce).to.equal(true)
    resolveStub().then(() => {
      expect(next.calledOnce).to.equal(true)
      expect(req).to.have.property("responseObject")
      expect(req.responseObject).to.equal(data)
      done()
    })
  })
})
