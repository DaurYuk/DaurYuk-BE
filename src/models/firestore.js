const Firestore = require('@google-cloud/firestore');

let db;

const initFirestore = () => {
  if (!db) {
    db = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.SERVICE_ACCOUNT_KEY_NAME
    })
  }
  return db;
}

module.exports = {
  users: initFirestore().collection('users'),
}