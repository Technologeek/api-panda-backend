const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const blueBird = require("bluebird")
const promisedJWT = blueBird.promisify(jwt.sign)

const createNewUser = async (username, email, password) => {
  let UserModel = new User({
    username: username,
    email: email,
    password: password
  })
  const user = await UserModel.save()
  let userDetails = {
    userID: user._id,
    userEmail: email
  }
  const token = await promisedJWT(userDetails, process.env.JWT_ENCRYPTION_KEY, {
    algorithm: "HS256",
    expiresIn: 36000
  })
  return {
    userId: userDetails.userID,
    email: userDetails.userEmail,
    token
  }
}

const loginExistingUser = async (email, password) => {
  const user = await User.findOne({ email })
  const isMatch = await user.comparePassword(password)
  if (isMatch) {
    let userDetails = {
      userID: user._id,
      userEmail: user.email
    }
    const generatedToken = await promisedJWT(
      userDetails,
      process.env.JWT_ENCRYPTION_KEY,
      { algorithm: "HS256", expiresIn: 36000 }
    )
    let responseToSend = {
      token: generatedToken,
      userId: userDetails.userID,
      email: user.email
    }
    return responseToSend
  }
  throw new Error("Incorrect Password")
}

const getUserInformation = async payload => {
  const userInformation = await User.findOne(payload)
  return userInformation
}
module.exports = { createNewUser, loginExistingUser, getUserInformation }
