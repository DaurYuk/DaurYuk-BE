const { usersDb, rewardsDb } = require("../../models/firestore");
const ResponseError = require("../../utils/errors/ResponseError");
const { sendSuccess, sendError } = require("../../utils/server/send");

async function GetRewardListController(req, res) {
  try {
    const userId = req.token.id;

    const user = await usersDb.doc(userId).get();
    if (!user.exists) {
      throw new ResponseError(404, "User not found.");
    }

    const { profile } = user.data();

    const rewards = await rewardsDb.get();

    const result = [];
    rewards.forEach((doc) => {
      const reward = doc.data();
      result.push({
        ...reward,
        claimable: profile.rewards_balance >= reward.required_points
      });
    })

    return sendSuccess(res, 200, {
      "length": result.length,
      "rewards": result
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    console.log(e);
    return sendError(res, 503, "There is a problem with the server. Please try again later.")
  }
}

module.exports = GetRewardListController;