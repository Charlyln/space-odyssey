const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  User,
};
