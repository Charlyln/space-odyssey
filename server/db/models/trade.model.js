const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Trade = sequelize.define('Trade', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
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
