function log(req, _, next) {
  console.log(`${(new Date()).toISOString()} | ${req.socket.remoteAddress} | ${req.method.toUpperCase()} | ${req.path}`)
  next();
}

module.exports = log;