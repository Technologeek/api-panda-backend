const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
          return reject(next(error))
        }
        if (isMatch) {
          let userDetails = {
            email: email,
            password: password
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
