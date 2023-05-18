const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Info = sequelize.define('Info', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  severity: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

module.exports = {
  Info,
};
