"use strict";

var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require("../models/userModel");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ENCRYPTION_KEY
};

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function (payload, done) {
    console.log("Reached", payload);
    User.findOne({
      email: payload.userEmail
    }).then(function (user) {
      console.log("Here", user);
      return done(null, user);
    })["catch"](function (err) {
      return done(err);
    });
  }));
};