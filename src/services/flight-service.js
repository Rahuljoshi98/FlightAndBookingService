const { StatusCodes } = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelper } = require('../utils/helpers');

const flightRepository = new FlightRepository();

const createFlight = async (data) => {
  try {
    const isValidTime = DateTimeHelper.compareTimes(
      data.arrivalTime,
      data.departureTime
    );
    if (!isValidTime) {
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
