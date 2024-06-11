const { FieldValue } = require("@google-cloud/firestore");
const { usersDb } = require("../../models/firestore");
const ResponseError = require("../../utils/errors/ResponseError");
const { sendSuccess, sendError } = require("../../utils/server/send");
const { validationResult } = require("express-validator");

async function UpdateRewardsBalanceController(req, res) {
  try {
    const validate = validationResult(req);

    if (!validate.isEmpty()) {
      throw new ResponseError(400, validate.array({ onlyFirstError: true })[0].msg)
    }
    const { point } = req.query;
    const userId = req.token.id;

    const doc = await usersDb.doc(userId).get();
    if (!doc.exists) {
      throw new ResponseError(404, "User not found.");
    }

    const user = doc.data();
    await usersDb.doc(userId).update({
      "profile.rewards_balance": FieldValue.increment(parseInt(point))
    });

    const newPoint = parseInt(point) + parseInt(user.profile.rewards_balance);

    return sendSuccess(res, 200, {
      "message": "Your points has been saved. Congratulations.",
      "rewards_balance": newPoint
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    console.log(e);
    return sendError(res, 503, "There is a problem with the server. Please try again later.")
  }
}

module.exports = UpdateRewardsBalanceController;