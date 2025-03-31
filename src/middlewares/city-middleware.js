const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const validateCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponse.message = "Something Went Wrong While Creating city";
    ErrorResponse.error = new AppError(
      ["City name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

module.exports = {
  validateCreateRequest,
};
