const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Planet = sequelize.define('Planet', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  temperature: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  size: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  danger: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  orbit: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  speed: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  color: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Planet,
};
