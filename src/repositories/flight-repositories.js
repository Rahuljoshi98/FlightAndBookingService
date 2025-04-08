const CrudRepository = require('./crud-repositories');

const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRepository;
