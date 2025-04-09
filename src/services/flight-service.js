const { StatusCodes } = require('http-status-codes');
const moment = require('moment');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { GetAllowedFieldsToEdit } = require('../utils/common');

const flightRepository = new FlightRepository();

const createFlight = async (data) => {
  try {
    const arrivalTime = moment(data.arrivalTime, 'YYYY-MM-DD HH:mm:ss');
    const departureTime = moment(data.departureTime, 'YYYY-MM-DD HH:mm:ss');
    if (
      arrivalTime.isBefore(departureTime) ||
      arrivalTime.isSame(departureTime)
    ) {
      throw new AppError(
        ['Departure time should be less than the arrival time.'],
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(
        ['Departure time should be less than the arrival time.'],
        StatusCodes.BAD_REQUEST
      );
    }
    if (
      error.name === 'SequelizeUniqueConstraintError' ||
      error.name === 'SequelizeValidationError'
    ) {
      let explanation = [];
      error?.errors?.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Can't Create the Flight."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createFlight
};
