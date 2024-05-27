const hapi = require('@hapi/hapi');
const ping = require('../controllers/misc/ping');
const log = require('../middlewares/log');

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
  app.ext('onPreHandler', (req, res) => {
    log(req, res)
    return res.continue;
  });

  app.route([
    {
      method: 'GET',
      path: '/ping',
      handler: ping
    }
  ])

  return app;
}

module.exports = initServer;