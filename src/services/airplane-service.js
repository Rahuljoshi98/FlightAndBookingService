const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { GetAllowedFieldsToEdit } = require("../utils/common");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error?.errors?.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Can't Create the Airplane."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplane = async (id) => {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ["The airplane you requested is not present."],
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      ["Can't Create the Airplane."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllAirplanes = async () => {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      ["Can't fetch the data of all the Airplanes."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirplanes = async (id) => {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ["The airplane you requested to delete is not present."],
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      ["Can't delete the Airplane."],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirplanes = async (data, id) => {
  try {
    const allowedFields = ["modelNumber", "capacity"];
    const fieldsToUpdate = GetAllowedFieldsToEdit(allowedFields, data);
    const response = await airplaneRepository.update(fieldsToUpdate, id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(
        ["No data provided to update the airplane"],
        StatusCodes.BAD_REQUEST
      );
    } else if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        ["The airplane you requested to update is not present."],
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

module.exports = {
  createAirplane,
  getAirplane,
  getAllAirplanes,
  destroyAirplanes,
  updateAirplanes,
};
