import "dotenv/config"
const errorHandler = require("../middlewares/errorHandler"),
  logger = require("../middlewares/logger"),
  boom = require("express-boom"),
  routes = require("../routes/routes")

const express = require("express"),
  app = express(),
  morgan = require("morgan")

//Error Parser
app.use(boom())

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

//Router
app.use("/api", routes)

//Logger
app.use("*", function(req, res) {
  logger.debug("Debug statement")
  logger.info("Info statement")
})

//Environment Settings
app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"), () => {
  console.log(
    "Node server Started @ " +
      new Date() +
      " Running on port no: " +
      app.get("port")
  )
})

app.use(errorHandler)
