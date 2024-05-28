/* Load the .env at the very first of the application before
   initalize everything, because some modules 
*/
require('dotenv').config();

const initServer = require('./src/routes/routes');
const exitRoutine = require('./src/utils/server/exit');

const init = async () => {
  // Initialize server
  const PORT = process.env.PORT || 8080;
  const server = await initServer(PORT)
  server.start();

  // Handle if any OS interrupt occurs
  process.on('SIGINT', exitRoutine(server));
  process.on('SIGTERM', exitRoutine(server));

  console.log(`Server started and listening on port ${PORT}`)
};

init();