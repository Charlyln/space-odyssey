const sqlite3 = require('sqlite3');
const { DBPATH } = require('./config');
const logger = require('./logger');

module.exports = {
  async connect() {
    this.db = new sqlite3.Database(DBPATH, (err) => {
      if (err) {
        logger.info('DB Could not connect to database on ', DBPATH, ' error : ', err);
      } else {
        logger.info('DB Connected to database');
      }
    });
  },
};
