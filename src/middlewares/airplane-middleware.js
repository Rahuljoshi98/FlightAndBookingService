const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const validateCreateRequest = async (req, res, next) => {
  if (!req.body.modelNumber) {
    ErrorResponse.message = 'Something Went Wrong While Creating airplane';
    ErrorResponse.error = new AppError(
      ['Model no not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

module.exports = {
  validateCreateRequest
};
