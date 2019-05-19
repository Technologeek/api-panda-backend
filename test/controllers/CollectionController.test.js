const expect = require("chai").expect
const sinon = require("sinon")
const CollectionControllers = require("./../../controllers/CollectionController")
const queries = require("./../../queries/Collections")

describe("testing User Schema Model", function() {
  let createNewCollectionStub,
    readUserCollectionStub,
    updateCollectionStub,
    removeCollectionStub

  before(() => {
    createNewCollectionStub = sinon.stub(queries, "createNewCollection")
    readUserCollectionStub = sinon.stub(queries, "readUserCollection")
    updateCollectionStub = sinon.stub(queries, "updateUserCollection")
    removeCollectionStub = sinon.stub(queries, "removeUserCollection")
  })
  after(() => {
    queries.createNewCollection.restore()
    queries.readUserCollection.restore()
    queries.updateUserCollection.restore()
    queries.removeUserCollection.restore()
  })

  it("should test createNewCollection function", async function() {
    const body = {
      user_id: 12343,
      collectionname: "testing",
      description: "testing Descriptions",
      url: "http://testing.co",
      method: "get",
      urls: "http://testing.co",
      imageDetails: "opop"
    }

    const userResponse = {
      user_id: 1222
    }

    createNewCollectionStub.resolves(userResponse)
    const response = await CollectionControllers.createNewCollection({ body })
    expect(userResponse).to.equal(response)
    expect(createNewCollectionStub.called).to.be.true
    expect(createNewCollectionStub.getCall(0).args[0]).to.equal(body.user_id)
    expect(createNewCollectionStub.getCall(0).args[3]).to.equal(body.url)
    expect(createNewCollectionStub.getCall(0).args[1]).to.equal(
      body.collectionname
    )
    expect(createNewCollectionStub.getCall(0).args[2]).to.equal(
      body.description
    )
    expect(createNewCollectionStub.getCall(0).args[4]).to.equal(body.method)
    expect(createNewCollectionStub.getCall(0).args[5]).to.equal(body.urls)
    expect(createNewCollectionStub.getCall(0).args[6]).to.equal(
      body.imageDetails
    )
  })
  it("should test readAllUserCollections function", async function() {
    const params = {
      userid: "123423"
    }
    const userResponse = {
      _id: 123234,
      ...params
    }
    readUserCollectionStub.resolves(userResponse)
    const response = await CollectionControllers.readAllUserCollections({
      params
    })
    expect(userResponse).to.equal(response)
    expect(readUserCollectionStub.called).to.be.true
    expect(readUserCollectionStub.getCall(0).args[0]).to.equal(params.userid)
  })
  it("should test updateCollection function", async function() {
    const params = {
      collectionId: "123423"
    }
    const body = {
      testingData: 1234
    }
    const userResponse = {
      _id: 123234,
      ...params,
      ...body
    }
    updateCollectionStub.resolves(userResponse)
    const response = await CollectionControllers.updateCollection({
      params,
      body
    })
    expect(updateCollectionStub.called).to.be.true
    expect(updateCollectionStub.getCall(0).args[0]).to.equal(
      params.collectionId
    )
    expect(updateCollectionStub.getCall(0).args[1]).to.equal(body)
    expect(response).to.have.property("data")
    expect(response).to.have.property("message")
    expect(response.data).to.equal(userResponse)
    expect(response.message).to.equal("Collection has been updated")
  })
  it("should test removeCollection function", async function() {
    const params = {
      collectionId: "123423"
    }
    const userResponse = {
      _id: 123234,
      ...params
    }
    removeCollectionStub.resolves(userResponse)
    const response = await CollectionControllers.removeCollection({ params })
    expect(removeCollectionStub.called).to.be.true
    expect(removeCollectionStub.getCall(0).args[0]).to.equal(
      params.collectionId
    )
    expect(response).to.equal(userResponse)
  })
})
