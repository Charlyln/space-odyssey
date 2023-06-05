const { Sequelize } = require('sequelize');
const { DBPATH } = require('./config');
const logger = require('./logger');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DBPATH,
  logging: false,
});

module.exports = {
  sequelize,
  async connect() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();

      logger.info('Sequelize connected to database');
    } catch (error) {
      logger.error('Sequelize could not connect to database', error);
    }
  },
};
