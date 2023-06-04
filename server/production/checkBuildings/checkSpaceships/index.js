const logger = require('../../../logger');
const { checkSpaceshipsStart } = require('./checkSpaceshipsStart');
const { checkSpaceshipsProgress } = require('./checkSpaceshipsProgress');

async function checkSpaceships(user) {
  logger.info('   Check Spaceships');

  await checkSpaceshipsStart(user);
  await checkSpaceshipsProgress(user);
}

module.exports = {
  checkSpaceships,
};
