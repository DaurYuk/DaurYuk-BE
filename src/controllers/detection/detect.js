const { FieldValue } = require("@google-cloud/firestore");
const uploadImageToCloudStorage = require("../../models/cloud_storage");
const { detectionHistoryDb, usersDb } = require("../../models/firestore");
const { sendSuccess, sendError } = require("../../utils/server/send");
const crypto = require('crypto');
const { validationResult } = require("express-validator");
const ResponseError = require("../../utils/errors/ResponseError");
const PredictImage = require("../../models/tensorflow/predict_image");

async function ImageDetectionController(req, res) {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      throw new ResponseError(400, validate.array({ onlyFirstError: true })[0].msg);
    }

    if (!req.file) {
      throw new ResponseError(400, "No image found. Please upload your image.");
    }

    const detectionId = crypto.randomBytes(12).toString('hex');
    const { buffer, mimetype } = req.file;

    const predictLabel = await PredictImage(buffer);
    const uploadedImageUrl = await uploadImageToCloudStorage(detectionId, buffer, mimetype);
    
    // Create data object for histories collections
    const data = {
      id: detectionId,
      detectedAt: (new Date()).toISOString(),
      userId: req.token.id,
      imageUrl: uploadedImageUrl,
      category: predictLabel
    };
    // Save new history detection data to Firestore
    await detectionHistoryDb.doc(detectionId).set(data);

    await usersDb.doc(req.token.id).update({
      detections: FieldValue.arrayUnion(detectionId),
    });

    return sendSuccess(res, 200, {
      url: uploadedImageUrl,
      detected_trash: predictLabel
    })
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    console.log(e);
    return sendError(res, 503, "There is a problem with the server. Please try again later.");
  }
}

module.exports = ImageDetectionController;