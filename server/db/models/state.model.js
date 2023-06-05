const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const State = sequelize.define('State', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
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
