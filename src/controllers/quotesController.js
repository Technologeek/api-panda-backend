const request = require("request")
const quotesController = {
  makeQuoteRequest: async (req, res, next) => {
    await request(
      "http://quotes.stormconsultancy.co.uk/random.json",
      (error, response, body) => {
        if (!error) {
          res.status(200).send(body)
        } else {
          res.status(400).send("Error : Problem Fetching Quotes")
        }
      }
    )
  }
}
module.exports = quotesController
