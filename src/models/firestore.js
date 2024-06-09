const Firestore = require('@google-cloud/firestore');

let db;

const initFirestore = () => {
  if (!db) {
    db = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.SERVICE_ACCOUNT_KEY_NAME
    })
    db
  }
  return db;
}

module.exports = {
  usersDb: initFirestore().collection('users'),
  detectionHistoryDb: initFirestore().collection('detection_histories'),
  articleDb: initFirestore().collection('articles'),
  rewardsDb: initFirestore().collection('rewards')
}