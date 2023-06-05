const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  User,
};
