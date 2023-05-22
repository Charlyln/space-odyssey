const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Research = sequelize.define('Research', {
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
  upgrading: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
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
  },
});

module.exports = {
  Research,
};
