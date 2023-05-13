const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Building = sequelize.define('Building', {
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
  Building,
};
