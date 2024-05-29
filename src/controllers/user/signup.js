const { sendSuccess } = require('../../utils/server/send')

function SignupController(req, res) {
  const body = req.body;
  // users.doc('email').set({
  //   'email': body.email
  // });
  return sendSuccess(res, 201, {
    'message': 'email created successfully'
  })
}

module.exports = SignupController;