const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const { startMoney } = require('../../constants/game');

const Money = sequelize.define('Money', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: 'money',
  },
  value: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: startMoney,
  },
});

module.exports = {
  Money,
};
