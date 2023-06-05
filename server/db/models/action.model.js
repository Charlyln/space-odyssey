const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Action = sequelize.define('Action', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
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
