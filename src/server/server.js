require("dotenv").config()
require("newrelic")

const connectToDb = require("../config/dbConfig")
const errorHandler = require("../middlewares/errorHandler"),
  logger = require("../middlewares/logger"),
  boom = require("express-boom"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  routes = require("../routes/routes")

const express = require("express"),
  app = express(),
  morgan = require("morgan")

//Error Parser
app.use(boom())

//CORS
app.use(cors())

//Passport
app.use(passport.initialize())

//Morgan Logging
app.use(
  morgan("dev", {
    skip: function(req, res) {
      return res.statusCode < 400
    },
    stream: process.stderr
  })
)

app.use(
  morgan("dev", {
    skip: function(req, res) {
      return res.statusCode >= 400
    },
    stream: process.stdout
  })
)

//Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//Router
app.use("/api", routes)

//Logger
app.use("*", function(req, res) {
  res.boom.notFound()
  console.log(req && req.username)
  logger.debug("Debug statement")
  logger.info("Info statement")
})

//Environment Settings
app.set("port", process.env.PORT || 3000)
connectToDb().then(async () => {
  app.listen(app.get("port"), () => {
    console.log(
      "Node server Started @ " +
        new Date() +
        " Running on port no: " +
        app.get("port")
    )
  })
})

app.use(errorHandler)
module.exports = app
