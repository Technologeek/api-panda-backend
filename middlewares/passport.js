import "dotenv/config"
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/userModel")

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ENCRYPTION_KEY
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      console.log("Reached", payload)
      User.findOne({ email: payload.email })
        .then(user => {
          console.log("Here", user)
          return done(null, user)
        })
        .catch(err => {
          return done(err)
        })
    })
  )
}
