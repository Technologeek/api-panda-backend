const chai = require("chai"),
  expect = require("chai").expect
const sinon = require("sinon")
const bcrypt = require("bcrypt")
const User = require("./../../models/userModel")

describe("testing User Schema Model", function() {
  it("should not throw error and get Accepted with min required Schema fields", function() {
    const userObject = new User({
      username: "testing",
      email: "testing@test.com",
      password: "rahulpatil"
    })
    userObject.validate(function(error, data) {
      expect(error).to.equal(null)
    })
  })

  it("checks for comparePassword", async function() {
    const userObject = new User({
      username: "testing",
      email: "testing@test.com",
      password: "rahul123"
    })

    const randomString = "randomString"
    const newCompare = sinon.stub(bcrypt, "compare")
    newCompare.returns(randomString)
    const output = await userObject.comparePassword(randomString)
    expect(output).to.equal(randomString)
    expect(newCompare.called).to.be.true
    expect(newCompare.getCall(0).args[0]).to.equal(randomString)
    expect(newCompare.getCall(0).args[1]).to.equal(userObject.password)
    bcrypt.compare.restore()
  })
})
