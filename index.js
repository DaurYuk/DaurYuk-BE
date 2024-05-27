const initServer = require('./src/routes/routes');

const init = async () => {
  // Load .env file
  require('dotenv').config();

  // Initialize server
  const PORT = process.env.PORT || 8080;
  (await initServer(PORT)).start();
  console.log(`Server started and listening on port ${PORT}`)
};

init();