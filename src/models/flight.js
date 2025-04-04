'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportCode',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportCode',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departureAirportCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalAirportCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      boardingGate: {
        type: DataTypes.STRING
      },
      totalSeats: {
        type: DataTypes.INTEGER(10, 2),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Flight'
    }
  );
  return Flight;
};
