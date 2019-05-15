const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const boom = require("express-boom")

const createNewUser = async (username, email, password, res, req, next) => {
  const createUserQuery = await new Promise((resolve, reject) => {
    let UserModel = new User({
      username: username,
      email: email,
      password: password
    })
    UserModel.save((error, userId) => {
      if (error) {
        return reject(next(error))
      }
      let userDetails = {
        userID: userId._id,
        userEmail: userId.email
      }
      JSON.stringify(userDetails)
      const generatedToken = jwt.sign(
        userDetails,
        process.env.JWT_ENCRYPTION_KEY,
        { algorithm: "HS256" },
        { expiresIn: 36000 },
        (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err })
        }
      )
      let responseToSend = {
        userId: userDetails.userID,
        email: userDetails.userEmail,
        token: generatedToken
      }
      resolve(res.status(200).send(JSON.stringify(responseToSend)))
    })
  })
  return createUserQuery
}

const loginExistingUser = async (email, password, res, req, next) => {
  const loginUserQuery = await new Promise((resolve, reject) => {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        return reject(next(error))
      }
      user.comparePassword(password, (error, isMatch) => {
        if (error) {
          console.log(error)
          return reject(res.status(403).json({ error: "Invalid Credentials" }))
        }
        if (isMatch) {
          let userDetails = {
            userID: user._id,
            userEmail: user.email
          }
          const generatedToken = jwt.sign(
            userDetails,
            process.env.JWT_ENCRYPTION_KEY,
            { algorithm: "HS256" },
            { expiresIn: 36000 },
            (err, token) => {
              if (err)
                res.status(500).json({ error: "Error signing token", raw: err })
            }
          )
          let responseToSend = {
            user_id: user._id,
            token: generatedToken
          }
          resolve(res.status(200).send(JSON.stringify(responseToSend)))
        }
      })
    })
  })
  return loginUserQuery
}
module.exports = { createNewUser, loginExistingUser }
