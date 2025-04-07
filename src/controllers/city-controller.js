const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
 * POST : /cities
 * req-body : {name : 'India'}
 */
const createCity = async (req, res) => {
  try {
    const city = await CityService.createCity({
      name: req.body.name
    });
    SuccessResponse.message = 'City Created Successfully';
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * DELETE : /cities/:id
 * req-body : {}
 */
const destroyCity = async (req, res) => {
  try {
    const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.message = 'City Deleted Successfully';
    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * PATCH : /cities/:id
 * req-body : {name: 'xyz'}
 */
const updateCity = async (req, res) => {
  try {
    const city = await CityService.updateCity(req.body, req.params.id);
    SuccessResponse.message = 'City Updated Successfully';
    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /cities/:id
 * req-body : {}
 */
const getCity = async (req, res) => {
  try {
    const cities = await CityService.getCity(req.params.id);
    SuccessResponse.message = 'City Fetched Successfully';
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /cities
 * req-body : {}
 */
const getCities = async (req, res) => {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.message = 'Cities Fetched Successfully';
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Something Went Wrong';
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createCity,
  destroyCity,
  updateCity,
  getCities,
  getCity
};
