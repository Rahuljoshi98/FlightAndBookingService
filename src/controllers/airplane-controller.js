const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
 * POST : /airplane
 * req-body : {modelNumber, capacity}
 */
const createAirplane = async (req, res) => {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.message = "Airplane Created Successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /airplane
 * req-body : {}
 */
const getAirplanes = async (req, res) => {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.message = "Airplanes Fetched Successfully";
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * GET : /airplane/:id
 * req-body : {}
 */
const getAirplane = async (req, res) => {
  try {
    const airplanes = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.message = "Airplane Fetched Successfully";
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

/*
 * DELETE : /airplane/:id
 * req-body : {}
 */
const destroyAirplane = async (req, res) => {
  try {
    const airplanes = await AirplaneService.destroyAirplanes(req.params.id);
    SuccessResponse.message = "Airplane Deleted Successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
