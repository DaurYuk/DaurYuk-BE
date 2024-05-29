function sendSuccess(res, statusCode, data) {
  const successMsg = {
    status: 'success',
    statusCode: statusCode,
    ...data
  };
  return res.status(statusCode).json(successMsg);
}

function sendError(res, statusCode, msg) {
  const failMsg = {
    status: 'fail',
    statusCode: statusCode,
    message: msg,
  };
  return res.status(statusCode).json(failMsg);
}

module.exports = {
  sendSuccess,
  sendError
};