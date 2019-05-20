class ValidationError extends Error {
  constructor(error) {
    const errorMessage = getRecentMessage(error)
    super(errorMessage)
    this.name = "ValidationError"
  }

  getStatusCode() {
    return 422
  }
}
const getRecentMessage = error => {
  try {
    const errorMessage = JSON.parse(error)
    return errorMessage[0]["msg"]
  } catch (err) {
    return error
  }
}

module.exports = ValidationError
