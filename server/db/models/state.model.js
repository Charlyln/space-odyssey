const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const State = sequelize.define('State', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  building: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
  },
  waiting: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
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
  State,
};
