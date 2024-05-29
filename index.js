/* Load the .env at the very first of the application before
// initalize everything, because some modules depends on the .env value
*/
require('dotenv').config();

const app = require('./src/routes/routes');

const init = async () => {
  // Initialize server
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server started and listening on port ${PORT}`)
  })
};

init();