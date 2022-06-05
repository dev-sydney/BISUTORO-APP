const res = require('express/lib/response');
const CustomError = require('./../utils/customError');

const handleDuplicateMongoKeys = (error) => {
  console.log(Object.values(error.keyValue)[0]);
  const errorMsg = `${
    Object.values(error.keyValue)[0]
  } is already Taken. Please try another email`;
  return new CustomError(errorMsg, 400);
};
const handleMongoValidationErrors = (error) => {
  const errorMsg = error.message.split(':')[2];
  return new CustomError(errorMsg, 400);
};
///////////////////////////////////////////////////////////
const handleDevErrors = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const handleProdErrors = (err, req, res) => {
  console.log(err);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'Error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    handleDevErrors(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.code === 11000) error = handleDuplicateMongoKeys(error);

    if (err.name === 'ValidationError')
      error = handleMongoValidationErrors(error);

    handleProdErrors(error, req, res);
  }
};
