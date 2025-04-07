const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const validateCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponse.message = 'Something Went Wrong While Creating airport';
    ErrorResponse.error = new AppError(
      ['Name not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = 'Something Went Wrong While Creating airport';
    ErrorResponse.error = new AppError(
      ['Code not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = 'Something Went Wrong While Creating airport';
    ErrorResponse.error = new AppError(
      ['City Id not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

module.exports = {
  validateCreateRequest
};
