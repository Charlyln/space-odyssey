const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Galaxy = sequelize.define('Galaxy', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

module.exports = {
  Galaxy,
};
