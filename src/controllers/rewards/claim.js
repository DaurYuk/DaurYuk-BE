const { validationResult } = require("express-validator");
const ResponseError = require("../../utils/errors/ResponseError");
const { usersDb, rewardsDb } = require("../../models/firestore");
const { sendSuccess, sendError } = require("../../utils/server/send");

async function ClaimRewardController(req, res) {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      throw new ResponseError(400, validate.array({ onlyFirstError: true })[0].msg);
    }

    const { rewardId } = req.query;
    const userId = req.token.id;

    const userDoc = usersDb.doc(userId);
    const user = await userDoc.get();
    if (!user.exists) {
      throw new ResponseError(404, "User not found.");
    }
    const { profile } = user.data();

    const reward = await rewardsDb.doc(rewardId).get()
    if (!reward.exists) {
      throw new ResponseError(404, "Reward not found.");
    }
    
    const { name: rewardName, required_points } = reward.data();

    if (profile.rewards_balance < required_points) {
      throw new ResponseError(403, "Your balance is not sufficient to claim the reward.");
    }

    await userDoc.update({
      'profile.rewards_balance': parseInt(profile.rewards_balance) - parseInt(required_points)
    });

    return sendSuccess(res, 200, {
      "message": `${rewardName} has been claimed successfully. Congratulations.`
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    return sendError(res, 503, "There is a problem with the server. Please try again later.")
  }
}

module.exports = ClaimRewardController;