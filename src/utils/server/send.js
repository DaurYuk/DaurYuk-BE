function sendSuccess(res, statusCode, data) {
  const successMsg = {
    status: 'success',
    code: statusCode,
    ...data
  };
  return res.response(successMsg).code(statusCode);
}

function sendError(res, statusCode, msg) {
  const failMsg = {
    status: 'fail',
    code: statusCode,
    message: msg,
  };
  return res.response(failMsg).code(statusCode);
}

module.exports = {
  sendSuccess,
  sendError
};