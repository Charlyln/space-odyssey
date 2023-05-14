const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Galaxy = sequelize.define('Galaxy', {
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
  Galaxy,
};
