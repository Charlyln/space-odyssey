const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Check = sequelize.define('Check', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  time: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
});

module.exports = {
  Check,
};
