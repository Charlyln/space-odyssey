const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Trade = sequelize.define('Trade', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  ressource: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  price: {
    type: DataTypes.NUMBER(),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.NUMBER(),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

module.exports = {
  Trade,
};
