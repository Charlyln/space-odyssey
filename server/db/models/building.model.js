const { DataTypes } = require('sequelize');
const { facilitiesStatus } = require('../../../enums/status');
const { sequelize } = require('../../sequelize');

const Building = sequelize.define('Building', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  production: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  base: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  output: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: facilitiesStatus.created,
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  startTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  duration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 20000,
  },
});

module.exports = {
  Building,
};
