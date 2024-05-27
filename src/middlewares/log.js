function log(req, _) {
  console.log(`${req.method.toUpperCase()} | ${req.path} | ${req.info.remoteAddress} | ${(new Date()).toISOString()}`)
}

module.exports = log;