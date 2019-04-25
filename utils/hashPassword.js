const bcrypt = require("bcrypt")
const saltRounds = 10

const hashPassword = async password => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
  return hashedPassword
}

const comparePasswordHash = async function(plainPassword) {
  const passwordFlag = await new Promise(function(resolve, reject) {
    console.log(plainPassword)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
  return passwordFlag
}
module.exports = { hashPassword, comparePasswordHash }
