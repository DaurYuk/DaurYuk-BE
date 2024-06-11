const fs = require('fs');

function exitRoutine() {
  // Delete cached tensorflow model
  console.log('Clearing tensorflow model cache...');
  fs.rmSync('./.tf_model_cache', {
    recursive: true,
    force: true
  },() => {
    console.log('TensorFlow model cache cleared successfully.');
  });

  process.exit(0);
}

module.exports = exitRoutine;