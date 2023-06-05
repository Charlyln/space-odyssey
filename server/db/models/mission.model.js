const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const { missionStatus } = require('../../../enums/index');

const Mission = sequelize.define('Mission', {
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
  level: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: missionStatus.created,
  },
  startTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  destinationTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  comebackTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  travelDuration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  missionDuration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Mission,
};
