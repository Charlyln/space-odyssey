const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Battle = sequelize.define('Battle', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  summary: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  Battle,
};
