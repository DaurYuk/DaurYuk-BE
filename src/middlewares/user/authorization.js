const jwt = require('jsonwebtoken');
const { sendError } = require('../../utils/server/send');

function AuthorizationMiddleware(req, res, next) {
  try {
    let sessionToken = req.headers['Authorization'.toLowerCase()];
    req.token = jwt.verify(sessionToken.slice('Bearer '.length), process.env.JWT_SECRET);
    next();
  } catch (e) {
    return sendError(res, 401, 'Invalid or expired session token. Please login again.');
  }
}

module.exports = AuthorizationMiddleware;