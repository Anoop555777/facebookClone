const AppError = require('./../utils/appError');
const handleCastErrorDB = err => {
  return new AppError(400, `Invalid ${err.path}:${err.value}`);
};

const handleDuplicateFieldDB = err => {
  const value = err.keyValue.name;

  return new AppError(
    400,
    `Duplicate field value ${value} please use another value`
  );
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(val => val.message);
  return new AppError(400, `Invalid input data ${errors.join('. ')}.`);
};

const handleJWTError = () =>
  new AppError(401, 'Invalid token.please log in again');

const handleTokenExpiredError = () =>
  new AppError(401, 'Token Expired please login again');

const errorForDev = (err, req, res) => {
  // A) API

  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

const errorForProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    errorForDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    if ((err.name = 'JsonWebTokenError')) error = handleJWTError();
    if ((err.name = 'TokenExpiredError')) error = handleTokenExpiredError();
    errorForProd(error, req, res);
  }
};
