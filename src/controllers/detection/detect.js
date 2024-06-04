const { FieldValue } = require("@google-cloud/firestore");
const uploadImageToCloudStorage = require("../../models/cloud_storage");
const { detectionHistoryDb, usersDb } = require("../../models/firestore");
const { sendSuccess } = require("../../utils/server/send");
const crypto = require('crypto');

async function ImageDetectionController(req, res) {
  const detectionId = crypto.randomBytes(12).toString('hex');
  const { buffer, mimetype } = req.file;
  const uploadedImageUrl = await uploadImageToCloudStorage(detectionId, buffer, mimetype);

  // Create data object for histories collections
  const data = {
    id: detectionId,
    detectedAt: (new Date()).toISOString(),
    userId: req.token.id,
    imageUrl: uploadedImageUrl,
    // dummy for a while, later if ML job done
    category: "plastic"
  };
  // Save new history detection data to Firestore
  await detectionHistoryDb.doc(detectionId).set(data);

  await usersDb.doc(req.token.id).update({
    detections: FieldValue.arrayUnion(detectionId),
  });

  return sendSuccess(res, 200, {
    url: uploadedImageUrl,
    detected_trash: "plastic"
  })
}

module.exports = ImageDetectionController;