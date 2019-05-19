const chai = require("chai"),
  expect = require("chai").expect
const CollectionSchema = require("./../../models/collectionModel")

describe("testing Collection Schema Model", () => {
  it("should throw error in case of non-required field", async function() {
    const collection = new CollectionSchema({})
    try {
      const value = await collection.validate()
      expect(value).to.equal(null)
    } catch (ex) {
      expect(ex).to.not.equal(null)
    }

    const collectionWithCollectionName = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing"
    })
    try {
      const value = await collectionWithCollectionName.validate()
      expect(value).to.equal(null)
    } catch (ex) {
      expect(ex).to.not.equal(null)
    }
  })
  it("should not throw error and get Accepted with min required Schema fields", function(done) {
    const collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET"
    })
    collectionObject.validate(function(error, data) {
      expect(error).to.equal(null)
      done()
    })
  })
  it("should throw error when collectionImage Schema validation fails", function(done) {
    const collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET",
      imageDetails: {
        url: "http://testing/134"
      }
    })
    collectionObject.validate(function(error, data) {
      expect(error.name).to.exist
      expect(error).to.not.equal(null)
      done()
    })
  })
  it("should throw error when collectionImage Schema validation fails", function(done) {
    const collectionObject = new CollectionSchema({
      collectionname: "testing",
      user_id: "testing",
      description: "description",
      method: "GET",
      imageDetails: {
        url: "http://testing/134",
        imagename: "testing Image"
      }
    })
    collectionObject.validate(function(error, data) {
      expect(error).to.equal(null)
      done()
    })
  })
})
