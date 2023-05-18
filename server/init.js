const logger = require('./logger');

async function createInitData(name) {
  try {
    logger.info('Create init data');
  } catch (error) {
    logger.error('createInitData', error);
  }
}

module.exports = {
  createInitData,
};
