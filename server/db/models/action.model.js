const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Action = sequelize.define('Action', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  parameters: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

module.exports = {
  Action,
};
