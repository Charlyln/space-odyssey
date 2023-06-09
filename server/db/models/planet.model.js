const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Planet = sequelize.define('Planet', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
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
