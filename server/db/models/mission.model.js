const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const Mission = sequelize.define('Mission', {
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
  level: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  ongoing: {
    type: DataTypes.BOOLEAN(),
    allowNull: true,
    defaultValue: false,
  },
  progress: {
    type: DataTypes.NUMBER(),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING(),
    allowNull: true,
    defaultValue: 'created',
  },
});

module.exports = {
  Mission,
};
