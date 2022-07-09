class Response {
  constructor(code = 200, result = {}, message = '') {
    this.result = result;
    this.code = code;
    this.message = message;
  }
}

module.exports = Response;
