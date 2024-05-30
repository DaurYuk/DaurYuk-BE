const { validationResult } = require("express-validator");
const { sendSuccess, sendError } = require("../../utils/server/send");
const ResponseError = require("../../utils/errors/ResponseError");
const { usersDb } = require("../../models/firestore");
const { verifyPassword } = require("../../utils/encryption/bcrypt");
const jwt = require('jsonwebtoken');

async function LoginController(req, res) {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      throw new ResponseError(400, validate.array({ onlyFirstError: true })[0].msg);
    }
    const { email, password } = req.body;

    // Check if the email registered in DB
    const data = await usersDb.where('email', '==', email).limit(1).get();
    if (data.empty) {
      throw new ResponseError(400, 'Email or password invalid. Please check your input.');
    }

    // Get the User Data
    let user;
    data.forEach((doc) => {
      const val = doc.data();
      if (val.email === email) {
        user = val;
      }
    });

    // Check if password is correct
    if (!await verifyPassword(password, user.password)) {
      throw new ResponseError(400, 'Email or password invalid. Please check your input.');
    }

    // Check if user verified their account
    if (!user.isVerified) {
      throw new ResponseError(401, 'Your account is currently not verified. Please check your email for verification.');
    }

    // All good, then create JWT and send it as response, login successfully
    const token = jwt.sign({
      id: user.id,
    },
      process.env.JWT_SECRET,
    {
      expiresIn: '3d'
    });
    return sendSuccess(res, 200, {
      "token": token
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    } else {
      console.log(e);
      return sendError(res, 500, 'There is a problem with the server. Please try again later.');
    }
  }
}

module.exports = LoginController;