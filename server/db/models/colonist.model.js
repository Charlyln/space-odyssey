const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Colonist = sequelize.define('Colonist', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  assignment: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: 'none',
  },
  age: {
    type: DataTypes.NUMBER(),
    allowNull: true,
  },
});

module.exports = {
  Colonist,
};
