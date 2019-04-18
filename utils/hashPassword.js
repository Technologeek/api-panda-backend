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

module.exports = hashPassword
