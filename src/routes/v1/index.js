const express = require('express');

const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');

const router = express.Router();

router.use('/airplane', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airport', airportRoutes);

module.exports = router;
