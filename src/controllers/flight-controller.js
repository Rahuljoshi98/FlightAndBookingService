const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
 * POST : /flight
 * req-body : {
 *  flightNumber,
 *  airplaneId,
 *  departureAirportCode,
 *  arrivalAirportCode,
 *  arrivalTime,
 *  departureTime,
 *  price,
 *  boardingGate,
 *  totalSeats
 * }
 */
const createFlight = async (req, res) => {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportCode: req.body.departureAirportCode,
      arrivalAirportCode: req.body.arrivalAirportCode,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats
    });
    SuccessResponse.message = 'Flight Created Successfully';
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createFlight
};
