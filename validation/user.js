class userValidation {
  constructor() {
    this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
    this.checkPassword = this.checkPassword.bind(this)
  }
  checkPassword(password) {
    return this.passwordRegex.test(password)
  }
  signUpValidation() {
    const _self = this

    return {
      username: {
        in: ["body"],
        errorMessage: "UserName must be unique & not empty",
        exists: true
      },
      email: {
        in: ["body"],
        errorMessage: "Invalid email Format",
        isEmail: true,
        exists: true
      },
      password: {
        in: ["body"],
        exists: true,
        errorMessage:
          "Password must be min 9 char long,have one uppercase,one lower case and one special character.",
        custom: {
          options: _self.checkPassword
        }
      }
    }
  }

  loginValidation() {
    return {
      email: {
        in: ["body"],
        errorMessage: "Invalid email Format",
        isEmail: true,
        exists: true
      },
      password: {
        in: ["body"],
        exists: true,
        errorMessage:
          "Password must be min 9 char long,have one uppercase,one lower case and one special character.",
        custom: {
          options: this.checkPassword
        }
      }
    }
  }
}

module.exports = new userValidation()
