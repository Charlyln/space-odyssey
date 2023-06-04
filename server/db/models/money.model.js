const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const { startMoney } = require('../../constants/game');

const Money = sequelize.define('Money', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
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
