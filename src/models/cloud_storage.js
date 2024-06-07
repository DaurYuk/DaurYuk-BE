const { Storage } = require('@google-cloud/storage');

let gcs;

const uploadImageToCloudStorage = async (filename, buffer, contentType) => {
  if (!gcs) {
    gcs = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.SERVICE_ACCOUNT_KEY_NAME
    });
  }

  const gcsDetectionImagesBucket = gcs.bucket('dauryuk');
  const completeFileName = `detection_images/${filename}.${(contentType === "image/png" ? 'png' : 'jpg')}`;
  gcsDetectionImagesBucket
    .file(completeFileName)
    .save(buffer, { contentType: contentType }, () => {
      console.log(`${filename} uploaded to Cloud Storage successfully!`);
    });
  return `https://storage.googleapis.com/dauryuk/${completeFileName}`;
}

module.exports = uploadImageToCloudStorage;