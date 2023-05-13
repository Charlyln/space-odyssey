const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Ressource = sequelize.define('Ressource', {
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
  Ressource,
};
