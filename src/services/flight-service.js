const { StatusCodes } = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { GetAllowedFieldsToEdit } = require('../utils/common');

const flightRepository = new FlightRepository();

const createFlight = async (data) => {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
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
