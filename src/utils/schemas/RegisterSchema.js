const RegisterSchema = {
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Email address is invalid. Please input your valid email address'
    }
  },
  name: {
    notEmpty: true,
    errorMessage: 'Please input your correct name.'
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password missing. Please input your password',
  },
}

module.exports = RegisterSchema;