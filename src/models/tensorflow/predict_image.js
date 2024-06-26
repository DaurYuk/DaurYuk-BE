const tf = require('@tensorflow/tfjs-node');
const { LoadModel } = require("./load_model");

async function PredictImage(image) {
  const model = await LoadModel();

  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([300, 300])
    .expandDims()
    .toFloat()
    .div(tf.scalar(255.0));

  const labels = [
    'Cardboard',
    'Food Organics',
    'Glass',
    'Metal',
    'Miscellaneous Trash',
    'Paper',
    'Plastic',
    'Textile Trash',
  ];

  const prediction = model.predict(tensor);
  const [predLabelIndex] = await prediction.as1D().argMax().data();

  return labels[predLabelIndex];
}

module.exports = PredictImage;