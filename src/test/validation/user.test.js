const chai = require("chai"),
  expect = require("chai").expect

const User = require("./../../validation/user")

describe("should validate signup validation", function() {
  it("should validate username", function() {
    const userNameValidation = User.signUpValidation().username
    expect(userNameValidation).to.have.property("in")
    expect(userNameValidation).to.have.property("errorMessage")
    expect(userNameValidation).to.have.property("exists")
    expect(userNameValidation.exists).to.equal(true)
  })
  it("should validate email", function() {
    const userNameValidation = User.signUpValidation().email
    expect(userNameValidation).to.have.property("in")
    expect(userNameValidation).to.have.property("errorMessage")
    expect(userNameValidation).to.have.property("exists")
    expect(userNameValidation).to.have.property("isEmail")
    expect(userNameValidation.exists).to.equal(true)
    expect(userNameValidation.isEmail).to.equal(true)
  })
  it("should validate password", function() {
    const userNameValidation = User.signUpValidation().password
    expect(userNameValidation).to.have.property("in")
    expect(userNameValidation).to.have.property("errorMessage")
    expect(userNameValidation).to.have.property("exists")
    expect(userNameValidation).to.have.property("custom")
    expect(userNameValidation.custom).to.have.property("options")
  })
  describe("should validate checkPassword", function() {
    it("should return false for wrong password", function() {
      const password = "testing123"
      const result = User.checkPassword(password)
      expect(result).to.equal(false)
    })
    it("should return true for right password", function() {
      const password = "Testing@123"
      const result = User.checkPassword(password)
      expect(result).to.equal(true)
    })
  })
})
describe("should validate login validation", function() {
  const loginValidation = User.loginValidation()
  it("should validate email", function() {
    const emailValidation = loginValidation.email
    expect(emailValidation).to.have.property("in")
    expect(emailValidation).to.have.property("errorMessage")
    expect(emailValidation).to.have.property("exists")
    expect(emailValidation).to.have.property("isEmail")
    expect(emailValidation.exists).to.equal(true)
    expect(emailValidation.isEmail).to.equal(true)
  })
  it("should validate password", function() {
    const passwordValidation = loginValidation.password
    expect(passwordValidation).to.have.property("in")
    expect(passwordValidation).to.have.property("errorMessage")
    expect(passwordValidation).to.have.property("exists")
    expect(passwordValidation).to.have.property("custom")
    expect(passwordValidation.custom).to.have.property("options")
  })
})
