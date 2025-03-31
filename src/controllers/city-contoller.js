const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");

const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
 * POST : /cities
 * req-body : {name : 'India'}
 */
const createCity = async (req, res) => {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.message = "City Created Successfully";
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createCity,
};
