const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

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

const getAllFlights = async (query) => {
  try {
    let customFilters = {};
    // trip filter
    if (query?.trips) {
      const [departureAirportCode, arrivalAirportCode] = query.trips.split('-');
      if (departureAirportCode === arrivalAirportCode) {
        throw new AppError(
          ['Departure airport and Arrival airport should not be same'],
          StatusCodes.BAD_REQUEST
        );
      }
      if (!departureAirportCode || !arrivalAirportCode) {
        throw new AppError(
          ['Departure airport and Arrival Airport can not be empty'],
          StatusCodes.BAD_REQUEST
        );
      }
      customFilters.departureAirportCode = departureAirportCode;
      customFilters.arrivalAirportCode = arrivalAirportCode;
    }
    // price filter
    if (query?.price) {
      const [minPrice, maxPrice] = query.price.split('-');
      if (minPrice > maxPrice) {
        throw new AppError(
          ['Invalid price range filter'],
          StatusCodes.BAD_REQUEST
        );
      }
      customFilters.price = {
        [Op.between]: [minPrice, maxPrice ? maxPrice : 20000]
      };
    }
    // total available seats
    if (query?.travellers) {
      if (query?.travellers <= 0) {
        throw new AppError(['Invalid travellers'], StatusCodes.BAD_REQUEST);
      }
      customFilters.totalSeats = {
        [Op.gte]: query?.travellers
      };
    }
    const flights = await flightRepository.getAllFlights(customFilters);
    return flights;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      const explanation = error.explanation[0];
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Can't fetch the data of all the Flights."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createFlight,
  getAllFlights
};
