const { DataTypes } = require('sequelize');
const { missionStatus } = require('../../../enums/index');
const { sequelize } = require('../../sequelize');

const Mission = sequelize.define('Mission', {
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
  travelDuration: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  missionDuration: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
});

module.exports = {
  Mission,
};
