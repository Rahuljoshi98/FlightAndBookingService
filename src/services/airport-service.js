const { StatusCodes } = require('http-status-codes');

const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { GetAllowedFieldsToEdit } = require('../utils/common');

const airportRepository = new AirportRepository();

const createAirport = async (data) => {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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
      ["Can't Create the Airport."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirport = async (id) => {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ['The airport you requested is not present.'],
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      ["Can't Get the Airport."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllAirports = async () => {
  try {
    const airport = await airportRepository.getAll();
    return airport;
  } catch (error) {
    throw new AppError(
      ["Can't fetch the data of all the Airports."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirport = async (id) => {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ['The airport you requested to delete is not present.'],
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      ["Can't delete the Airport."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirport = async (data, id) => {
  try {
    const allowedFields = ['name', 'code', 'address', 'cityId'];
    const fieldsToUpdate = GetAllowedFieldsToEdit(allowedFields, data);
    const response = await airportRepository.update(fieldsToUpdate, id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(
        ['No data provided to update the airport'],
        StatusCodes.BAD_REQUEST
      );
    } else if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ['The airport you requested to update is not present.'],
        StatusCodes.NOT_FOUND
      );
    } else if (
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
      ["Can't update the Airport."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirport,
  getAirport,
  getAllAirports,
  destroyAirport,
  updateAirport
};
