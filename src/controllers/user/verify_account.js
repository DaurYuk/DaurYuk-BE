const { validationResult } = require("express-validator");
const ResponseError = require("../../utils/errors/ResponseError");
const { sendSuccess, sendError } = require("../../utils/server/send");
const { usersDb } = require("../../models/firestore");
const { FieldValue } = require("@google-cloud/firestore");

async function VerifyAccountController(req, res) {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      throw new ResponseError(400, 'No token input.');
    }
    const { token } = req.query;
    const verifyUser = await usersDb.where('verificationToken', '==', token).limit(1).get();

    if (verifyUser.empty) {
      throw new ResponseError(400, 'Invalid token, Please ensure the verify token is correctly inputted')
    }

    let userId;
    verifyUser.forEach((doc) => {
      const data = doc.data();
      if (data.verificationToken === token) {
        userId = doc.id;
        return;
      } 
    })
    // Update the account to verified
    usersDb.doc(userId).update({
      isVerified: true,
      verificationToken: FieldValue.delete(),
      updatedAt: (new Date()).toISOString(),
    });

    return sendSuccess(res, 200, {
      'message': 'Your account has been verified successfully. You can login.'
    });

  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    } else {
      // Log the error for debugging purpose
      console.log(e);
      return sendError(res, 500, 'There is a problem with the server. Please try again later');
    }
  }
}

module.exports = VerifyAccountController;