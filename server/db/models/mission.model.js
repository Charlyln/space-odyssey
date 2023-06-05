const { DataTypes } = require('sequelize');
const { missionStatus } = require('../../../enums/status');
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
  ongoing: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
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
  comebackTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  duration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Mission,
};
