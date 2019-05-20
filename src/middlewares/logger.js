const winston = require("winston"),
  level = process.env.LOG_LEVEL || "debug",
  logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        level: level,
        timestamp: function() {
          return new Date().toISOString()
        }
      }),
      new winston.transports.File({ filename: "combined.log" })
    ]
  })
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  )
}

module.exports = logger
