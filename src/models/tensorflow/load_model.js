const fs = require('fs');
const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');

function cacheTFModelFile(fileName, file) {
  if (!fs.existsSync('.tf_model_cache')) {
    fs.mkdirSync('.tf_model_cache');
  }

  fs.writeFileSync(`.tf_model_cache/${fileName}`, file);
}
function FetchTfModelFromGcs() {
  const gcs = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.SERVICE_ACCOUNT_KEY_NAME,
  });

  const tf_bucket = gcs.bucket('dauryuk_tf');

  tf_bucket.getFiles().then((result) => {
    result[0].forEach(v => {
      const fileName = v.name.replace(/tf_model\//g, '');
      v.download().then((val) => {
        cacheTFModelFile(fileName, val[0]);
      })
    });
  });
}

async function LoadModel() {
  if (!fs.existsSync('.tf_model_cache')) {
    fetchFromGcs();
  }

  const model = await tf.loadGraphModel(tfn.io.fileSystem('.tf_model_cache/model.json'));
  return model;
};

module.exports = {
  FetchTfModelFromGcs,
  LoadModel
};