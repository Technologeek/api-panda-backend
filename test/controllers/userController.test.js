const expect = require("chai").expect
const sinon = require("sinon")
const userControllerFileLocation = "./../../controllers/UserController"
const UserController = require(userControllerFileLocation)
const Utils = require("./../../utils/hashPassword")
const queries = require("./../../queries/queries")

describe("testing User Schema Model", function() {
  let hashPasswordStub, loginExistingUserStub, createNewUserStub

  before(() => {
    hashPasswordStub = sinon.stub(Utils, "hashPassword")
    createNewUserStub = sinon.stub(queries, "createNewUser")
    loginExistingUserStub = sinon.stub(queries, "loginExistingUser")
  })
  after(() => {
    queries.createNewUser.restore()
    queries.loginExistingUser.restore()
    Utils.hashPassword.restore()
  })

  it("should test registerNewUser function", async function() {
    const body = {
      username: "rahul",
      email: "rahulanandpatil@gmail.com",
      password: "password"
    }
    const encryptedString = "randomString"
    const userResponse = {
      _id: 123234,
      ...body
    }
    hashPasswordStub.resolves(encryptedString)
    createNewUserStub.resolves(userResponse)
    const response = await UserController.registerNewUser({ body })
    expect(userResponse).to.equal(response)
    expect(hashPasswordStub.called).to.be.true
    expect(hashPasswordStub.getCall(0).args[0]).to.equal(body.password)
    expect(createNewUserStub.getCall(0).args[0]).to.equal(body.username)
    expect(createNewUserStub.getCall(0).args[1]).to.equal(body.email)
    expect(createNewUserStub.getCall(0).args[2]).to.equal(encryptedString)
  })
  it("should test loginNewUser function", async function() {
    const body = {
      email: "rahulanandpatil@gmail.com",
      password: "password"
    }
    const userResponse = {
      _id: 123234,
      ...body
    }
    loginExistingUserStub.resolves(userResponse)
    const response = await UserController.loginUser({ body })
    expect(userResponse).to.equal(response)
    expect(loginExistingUserStub.called).to.be.true
    expect(loginExistingUserStub.getCall(0).args[0]).to.equal(body.email)
    expect(loginExistingUserStub.getCall(0).args[1]).to.equal(body.password)
  })
})
