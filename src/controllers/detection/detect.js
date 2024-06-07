const { FieldValue } = require("@google-cloud/firestore");
const uploadImageToCloudStorage = require("../../models/cloud_storage");
const { detectionHistoryDb, usersDb } = require("../../models/firestore");
const { sendSuccess, sendError } = require("../../utils/server/send");
const crypto = require('crypto');
const { validationResult } = require("express-validator");
const ResponseError = require("../../utils/errors/ResponseError");

async function ImageDetectionController(req, res) {
  try {
    if (!req.file) {
      throw new ResponseError(400, "No image found. Please upload your image.");
    }
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
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    return sendError(res, 503, "There is a problem with the server. Please try again later.");
  }
}

module.exports = ImageDetectionController;