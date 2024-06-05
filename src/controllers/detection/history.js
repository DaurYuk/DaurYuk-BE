const { detectionHistoryDb, usersDb } = require("../../models/firestore");
const { sendSuccess } = require("../../utils/server/send");

async function GetDetectionHistoryController(req, res) {
  try {
    const userId = req.token.id;
  
    const histories = await detectionHistoryDb.where('userId', '==', userId).get();
    const data = [];
    histories.forEach((doc) => {data.push(doc.data())});
  
    return sendSuccess(res, 200, {
      "length": data.length,
      "data": data,
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    return sendError(res, 503, "There is a problem with the server. Please try again later.");
  }
};

module.exports = GetDetectionHistoryController;