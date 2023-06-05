const logger = require('../../../logger');
const { checkSpaceshipsStart } = require('./checkSpaceshipsStart');
const { checkSpaceshipsProgress } = require('./checkSpaceshipsProgress');

async function checkSpaceships(user, checkDate) {
  logger.info('   Check Spaceships');

  await checkSpaceshipsStart(user, checkDate);
  await checkSpaceshipsProgress(user, checkDate);
}

module.exports = {
  checkSpaceships,
};
