const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const validateCreateRequest = async (req, res, next) => {
  if (!req.body.flightNumber) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Flight no not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Airplane id not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportCode) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Departure Airport code not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportCode) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Arrival Airport Code not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Arrival time not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Departure time not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Price not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = 'Something Went Wrong While Creating flight';
    ErrorResponse.error = new AppError(
      ['Total seats not found in incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

module.exports = {
  validateCreateRequest
};
