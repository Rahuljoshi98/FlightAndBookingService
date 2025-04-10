const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

//  /api/v1/flight - POST
router.post(
  '/',
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

//  /api/v1/flight?trips=VNS-DEL&price=1300-2000 - GET
router.get('/', FlightController.getFlights);

module.exports = router;
