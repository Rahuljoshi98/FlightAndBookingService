"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("airplanes", [
      {
        modelNumber: "air 212",
        capacity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "new airbus1",
        capacity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "new airbus2",
        capacity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(
      "airplanes",
      {
        [Op.or]: [
          { modelNumber: "new airbus2" },
          { modelNumber: "new airbus1" },
        ],
      }
      // { truncate: true }   // it will reset the PK but the where clasuse will not work i.e., it will remove all the records.
    );
  },
};
