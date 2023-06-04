const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Cost = sequelize.define('Cost', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
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
