const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Building = sequelize.define('Building', {
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
  production: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  enable: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
  },
  level: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  upgrading: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
  },
  waiting: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  order: {
    type: DataTypes.NUMBER(),
  },
  startTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  duration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Building,
};
