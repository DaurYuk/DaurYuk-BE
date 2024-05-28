function log(req, res) {
  console.log(`${(new Date()).toISOString()} | ${req.response.statusCode} | ${req.info.remoteAddress} | ${req.method.toUpperCase()} | ${req.path}`)
}

module.exports = log;