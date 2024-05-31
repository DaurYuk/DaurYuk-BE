const userCredentialSchema = {
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Email address is invalid. Please input your valid email address'
    }
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password missing. Please input your password',
  },
}

module.exports = userCredentialSchema;