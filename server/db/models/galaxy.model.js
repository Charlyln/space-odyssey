const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Galaxy = sequelize.define('Galaxy', {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  Galaxy,
};
