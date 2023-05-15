const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Spaceship = sequelize.define('Spaceship', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  capacity: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  transport: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  attack: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  defense: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  speed: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  building: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
  },
  enable: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
  },
});

module.exports = {
  Spaceship,
};
