const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const System = sequelize.define('System', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  size: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  sunSize: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  sunColor: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  sunShadow: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  System,
};
