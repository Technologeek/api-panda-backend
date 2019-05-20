"use strict";

var mongoose = require("mongoose");

var Mockgoose = require("mockgoose").Mockgoose;

var mockgoose = new Mockgoose(mongoose);

var connectToDb = function connectToDb() {
  var dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/api-panda";
  var environment = process.env.NODE_ENV;

  if (environment === "test") {
    return new Promise(function (resolve, reject) {
      mockgoose.prepareStorage().then(function () {
        mongoose.connect(dbUrl, {
          useNewUrlParser: true
        });
      });
      mongoose.connection.once("open", function () {
        console.log("Test Data Base Collection");
        return resolve();
      });
      mongoose.connection.on("error", function (error) {
        console.log(error);
        return reject(error);
      });
    });
  }

  return mongoose.connect(dbUrl, {
    useNewUrlParser: true
  }, function (error) {
    if (error) console.log("Connection Unsuccesful", error);else {
      var dataBase = mongoose.connection;
      console.log("Successfully Connected to the Databse", dataBase.name, "at host", dataBase.host);
    }
  });
};

module.exports = connectToDb;