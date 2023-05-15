const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const State = sequelize.define('State', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  building: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = {
  State,
};
