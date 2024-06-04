const { detectionHistoryDb, usersDb } = require("../../models/firestore");
const { sendSuccess } = require("../../utils/server/send");

async function GetDetectionHistoryController(req, res) {
  const userId = req.token.id;

  const histories = await detectionHistoryDb.where('userId', '==', userId).get();
  const data = [];
  histories.forEach((doc) => {data.push(doc.data())});

  return sendSuccess(res, 200, {
    "length": data.length,
    "data": data,
  });
};

module.exports = GetDetectionHistoryController;