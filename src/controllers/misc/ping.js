const { sendSuccess } = require('../../utils/send');

function ping(_, res) {
  return sendSuccess(res, 200, {
    'message': "Pong!"
  });
}

module.exports = ping;