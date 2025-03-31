const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

const createCity = async (data) => {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      let explanation = [];
      error?.errors?.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Can't Create the City."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createCity,
};
