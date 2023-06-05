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
  type: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  production: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  output: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 10000,
  },
  level: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: 'created',
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  startTime: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  duration: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 20000,
  },
});

module.exports = {
  Building,
};
