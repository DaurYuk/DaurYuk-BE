function Signup(req, res) {
  const body = req.payload;
  // users.doc('email').set({
  //   'email': body.email
  // });
  return sendSuccess(res, 201, {
    'message': 'email created successfully'
  })
}

module.exports = Signup;