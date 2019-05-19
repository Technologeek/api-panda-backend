const mongoose = require("mongoose")
const Mockgoose = require("mockgoose").Mockgoose
const mockgoose = new Mockgoose(mongoose)

const connectToDb = () => {
  let dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/api-panda"
  let environment = process.env.NODE_ENV
  if (environment === "test") {
    return new Promise((resolve, reject) => {
      mockgoose.prepareStorage().then(() => {
        mongoose.connect(dbUrl, { useNewUrlParser: true })
      })
      mongoose.connection.once("open", () => {
        console.log("Test Data Base Collection")
        return resolve()
      })

      mongoose.connection.on("error", error => {
        console.log(error)
        return reject(error)
      })
    })
  }
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
