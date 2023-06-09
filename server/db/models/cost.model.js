const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Cost = sequelize.define('Cost', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  ressource: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  craft: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  Cost,
};
