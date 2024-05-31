class ResponseError extends Error {
  constructor(code, msg) {
    super(msg);
    this.stack = (new Error()).stack;
    this.statusCode = code;
  }
}

module.exports = ResponseError;