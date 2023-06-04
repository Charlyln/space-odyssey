const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Check = sequelize.define('Check', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE(),
    allowNull: true,
    defaultValue: new Date(),
  },
});

module.exports = {
  Check,
};
