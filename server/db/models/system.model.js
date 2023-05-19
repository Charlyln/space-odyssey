const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const System = sequelize.define('System', {
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
  System,
};
