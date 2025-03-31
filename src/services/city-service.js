const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { GetAllowedFieldsToEdit } = require("../utils/common");

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

const updateCity = async (data, id) => {
  try {
    const allowedFields = ["name"];
    const fieldsToUpdate = GetAllowedFieldsToEdit(allowedFields, data);
    const response = await cityRepository.update(fieldsToUpdate, id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(
        ["No data provided to update the city"],
        StatusCodes.BAD_REQUEST
      );
    } else if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ["The city you requested to update is not present."],
        StatusCodes.NOT_FOUND
      );
    } else if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error?.errors?.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Can't update the Airplane."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyCity = async (id) => {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ["The city you requested to delete is not present."],
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      ["Can't delete the Airplane."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createCity,
  updateCity,
  destroyCity,
};
