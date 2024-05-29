const { validationResult } = require('express-validator');
const { sendSuccess, sendError } = require('../../utils/server/send');
const ResponseError = require('../../utils/errors/ResponseError');
const { usersDb } = require('../../models/firestore');
const crypto = require('crypto');
const { encryptPassword } = require('../../utils/encryption/bcrypt');

async function SignupController(req, res) {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      throw new ResponseError(400, validate.array({ onlyFirstError: true })[0].msg);
    }

    const { email, password } = req.body;

    const emailExist = await usersDb.where('email', '==', email).get();

    if (!emailExist.empty) {
      throw new ResponseError(409, 'Email already registered. Please register with another email')
    }

    const newUserUuid = crypto.randomUUID();

    await usersDb.doc(newUserUuid).set({
      id: newUserUuid,
      email: email,
      password: await encryptPassword(password),
      isVerified: false,
      verificationToken: crypto.randomBytes(48).toString('hex')
      // later will be implemented
      // verifyToken: 
    });

    return sendSuccess(res, 201, {
      'message': 'Your account has been created. Please check your email for account activation'
    })
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    } else {
      console.log(e);
      return sendError(res, 500, 'There is a problem with the server. Please try again later.')
    }
  }
}

module.exports = SignupController;