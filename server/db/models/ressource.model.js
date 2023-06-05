const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Ressource = sequelize.define('Ressource', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  value: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  production: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  consumption: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  storage: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
  price: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Ressource,
};
