/* Load the .env at the very first of the application before
// initalize everything, because some modules depends on the .env value
*/
require('dotenv').config();

const { FetchTfModelFromGcs } = require('./src/models/tensorflow/load_model');
const app = require('./src/routes/routes');
const exitRoutine = require('./src/utils/process/exit');

const init = async () => {
  // Cache the TensorFlow model first from Google Cloud Storage
  FetchTfModelFromGcs();
  
  // Initialize server
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server started and listening on port ${PORT}`)
  })

  process.on('SIGTERM', exitRoutine);
  process.on('SIGINT', exitRoutine);
};

init();