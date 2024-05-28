const hapi = require('@hapi/hapi');
const ping = require('../controllers/misc/ping');
const log = require('../middlewares/log');
const { users } = require('../models/firestore');
const { sendSuccess } = require('../utils/server/send');
const Signup = require('../controllers/user/signup');

const initServer = async (port) => {
  const app = hapi.server({
    port: port,
    host: '0.0.0.0',
    info: {
      // enable remote for logging IP address
      remote: true
    }
  });

  // Log Middleware
  app.ext('onPreResponse', (req, res) => {
    log(req, res)
    return res.continue;
  });

  app.route([
    {
      method: 'GET',
      path: '/ping',
      handler: ping
    },
    {
      'method': 'POST',
      path: '/firestore-test',
      handler: Signup 
    }
  ])

  return app;
}

module.exports = initServer;