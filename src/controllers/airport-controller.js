const { StatusCodes } = require('http-status-codes');
const { AirportService, CityService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
 * POST : /airport
 * req-body : {name, code, address, cityId}
 */
const createAirport = async (req, res) => {
  try {
    // to check if the city is present or not
    // const city = await CityService.getCity(req.body.cityId);

    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId
    });
    SuccessResponse.message = 'Airport Created Successfully';
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /airport
 * req-body : {}
 */
const getAirports = async (req, res) => {
  try {
    const airports = await AirportService.getAllAirports();
    SuccessResponse.message = 'Airports Fetched Successfully';
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /airport/:id
 * req-body : {}
 */
const getAirport = async (req, res) => {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.message = 'Airport Fetched Successfully';
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * DELETE : /airport/:id
 * req-body : {}
 */
const destroyAirport = async (req, res) => {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = 'Airport Deleted Successfully';
    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * PATCH : /airport/:id
 * req-body : {modelNumber, capacity}
 */
const updateAirport = async (req, res) => {
  try {
    const airplanes = await AirportService.updateAirport(
      req.body,
      req.params.id
    );
    SuccessResponse.message = 'Airport Updated Successfully';
    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
