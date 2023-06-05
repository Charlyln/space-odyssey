const logger = require('../../../logger');
const { checkSpaceshipsStart } = require('./checkSpaceshipsStart');
const { checkSpaceshipsProgress } = require('./checkSpaceshipsProgress');

async function checkSpaceships(user, checkTime) {
  logger.info('   Check Spaceships');

  await checkSpaceshipsStart(user, checkTime);
  await checkSpaceshipsProgress(user, checkTime);
}

module.exports = {
  checkSpaceships,
};
