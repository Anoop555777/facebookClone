class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
