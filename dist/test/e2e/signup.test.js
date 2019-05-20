"use strict";

var chai = require("chai");

var expect = chai.expect;

var chaiHttp = require("chai-http");

var app = require("./../../server/server");

var path = require("path");

var dotEnvPath = path.resolve("./../../.env");

require("dotenv").config({
  path: dotEnvPath
});

chai.use(chaiHttp);
describe("testing User collection end 2 end integration test", function () {
  var body, rightPassword, token, user_id, rightEmail, rightUserName, collectionBody, collectionId, request;
  before(function () {
    body = {
      username: "asdfasdfasdsfsfdedfasdf",
      email: "rahul.sinhma@gmail.com",
      password: "afaf"
    };
    rightUserName = "alfred!@#";
    rightPassword = "Rahul@1234511";
    rightEmail = "rahulanandpatil@gmail.com";
    collectionBody = {
      collectionname: "rahul",
      method: "get",
      description: "desc",
      user_id: user_id
    };
    request = chai.request(app).keepOpen();
  });
  after(function () {
    return request.close();
  });
  it("User will not able to signup in case of small password", function (done) {
    request.post("/api/auth/signup").send(body).end(function (err, res) {
      expect(res.status).to.equal(422);
      expect(err).to.be["null"];
      expect(res.body.message).to.equal("Password must be min 9 char long,have one uppercase,one lower case and one special character.");
      done();
    });
  });
  it("User will not able to signup in case of wrong email", function (done) {
    var newBody = Object.assign({}, body);
    newBody.email = "rararar";
    newBody.password = rightPassword;
    request.post("/api/auth/signup").send(newBody).end(function (err, res) {
      expect(res.status).to.equal(422);
      expect(err).to.be["null"];
      expect(res.body.message).to.equal("Invalid email Format");
      done();
    });
  });
  it("User will not able to signup in case of wrong or empty username", function (done) {
    var newBody = Object.assign({}, body);
    newBody.password = rightPassword;
    delete newBody.username;
    request.post("/api/auth/signup").send(newBody).end(function (err, res) {
      expect(res.status).to.equal(422);
      expect(err).to.be["null"];
      expect(res.body.message).to.equal("UserName must be unique & not empty");
      done();
    });
  });
  it("User will able to signup", function (done) {
    var newBody = Object.assign({}, body);
    newBody.password = rightPassword;
    request.post("/api/auth/signup").send(newBody).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(err).to.be["null"];
      var body = res.body.body;
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      expect(body).to.have.property("token");
      expect(body).to.have.property("email");
      expect(body).to.have.property("userId");
      done();
    });
  });
  it("User will not able to signup with same credentials", function (done) {
    var newBody = Object.assign({}, body);
    newBody.password = rightPassword;
    request.post("/api/auth/signup").send(newBody).end(function (err, res) {
      expect(res.status).to.equal(422);
      expect(err).to.be["null"];
      expect(res.body.message).to.equal("User validation failed: username: username must be unique");
      expect(res.body).to.have.property("error");
      done();
    });
  });
  it("User will able to login with same credentials", function (done) {
    var newBody = Object.assign({}, body);
    newBody.password = rightPassword;
    request.post("/api/auth/login").send(newBody).end(function (err, res) {
      expect(err).to.be["null"];
      console.log(res.status, res.body);
      var body = res.body.body;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      expect(body).to.have.property("token");
      token = body.token;
      user_id = body.userId;
      expect(body).to.have.property("email");
      expect(body).to.have.property("userId");
      done();
    });
  });
  it("User will unable to login with wrong password", function (done) {
    var newBody = Object.assign({}, body);
    newBody.password = rightPassword + "!!";
    request.post("/api/auth/login").send(newBody).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal("Incorrect Password");
      expect(res.body).to.have.property("error");
      done();
    });
  });
  it("User Will able to create its own collection", function (done) {
    var newCollectionBody = Object.assign({}, collectionBody);
    newCollectionBody.user_id = user_id;
    console.log(newCollectionBody, "userId nahi hain");
    request.post("/api/users/".concat(user_id, "/collections")).set("Authorization", "Bearer ".concat(token)).send(newCollectionBody).end(function (err, res) {
      expect(err).to.be["null"];
      var body = res.body.body;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      expect(body).to.have.property("_id");
      expect(body).to.have.property("user_id");
      expect(body).to.have.property("collectionname");
      expect(body).to.have.property("description");
      expect(body).to.have.property("method");
      expect(body).to.have.property("urls");
      expect(body).to.have.property("imageDetails");
      collectionId = body._id;
      done();
    });
  });
  it("User Will not able to create Collection if no userId is present", function (done) {
    console.log(collectionBody); // collectionBody.userId = userId

    request.post("/api/users/".concat(user_id, "/collections")).set("Authorization", "Bearer ".concat(token)).send(collectionBody).end(function (err, res) {
      expect(res.status).to.equal(422);
      expect(res.body.message).to.equal("Collections validation failed: user_id: UserId is Required");
      expect(res.body).to.have.property("error");
      done();
    });
  });
  it("User Will not able to create Collection if it has not signed in", function (done) {
    console.log(collectionBody); // collectionBody.userId = userId

    request.post("/api/users/".concat(user_id, "/collections")) // .set('Authorization', `Bearer ${token}`)
    .send(collectionBody).end(function (err, res) {
      expect(res.status).to.equal(401);
      done();
    });
  });
  it("User Will able to fetch its own collections", function (done) {
    request.get("/api/users/".concat(user_id, "/collections")).set("Authorization", "Bearer ".concat(token)).end(function (err, res) {
      expect(err).to.be["null"];
      var body = res.body.body;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      expect(body).to.be.an("array");
      expect(body.length).to.greaterThan(0);
      var firstCollection = body[0];
      expect(firstCollection).to.have.property("user_id");
      expect(firstCollection).to.have.property("collectionname");
      expect(firstCollection).to.have.property("description");
      expect(firstCollection).to.have.property("method");
      expect(firstCollection).to.have.property("urls");
      expect(firstCollection).to.have.property("imageDetails");
      done();
    });
  });
  it("User Will able to update its own collections", function (done) {
    request.put("/api/collections/".concat(collectionId)).set("Authorization", "Bearer ".concat(token)).send({
      collectionname: "New Collection"
    }).end(function (err, res) {
      expect(err).to.be["null"];
      var body = res.body.body;
      console.log(body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      expect(body).to.have.property("message");
      expect(body.message).to.equal("Collection has been updated");
      expect(body.data).to.be.an("object");
      var data = body.data;
      expect(data).to.have.property("user_id");
      expect(data).to.have.property("collectionname");
      expect(data).to.have.property("description");
      expect(data).to.have.property("method");
      expect(data).to.have.property("urls");
      expect(data).to.have.property("imageDetails");
      done();
    });
  });
  it("User Will able to delete its own collection", function (done) {
    request["delete"]("/api/collections/".concat(collectionId)).set("Authorization", "Bearer ".concat(token)).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("success");
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("body");
      expect(res.body.success).to.be["true"];
      expect(res.body.status).to.equal(200);
      done();
    });
  });
});