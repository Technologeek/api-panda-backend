import "dotenv/config"
const mongoose = require("mongoose")

const connectToDb = () => {
  let dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017  /api-panda"
  return mongoose.connect(dbUrl, { useNewUrlParser: true }, error => {
    if (error) console.log("Connection Unsuccesful", error)
    else {
      let dataBase = mongoose.connection
      console.log(
        "Successfully Connected to the Databse",
        dataBase.name,
        "at host",
        dataBase.host
      )
    }
  })
}
module.exports = connectToDb
