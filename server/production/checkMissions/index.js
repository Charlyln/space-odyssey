const logger = require('../../logger');
const { checkSetupMissions } = require('./checkSetupMissions');
const { checkLaunchedMissions } = require('./checkLaunchedMissions');
const { checkDestinationMissions } = require('./checkDestinationMissions');
const { checkComebackMissions } = require('./checkComebackMissions');

async function checkMissions(user, checkTime) {
  logger.info('Check Missions');
  await checkSetupMissions(user);
  await checkLaunchedMissions(user, checkTime);
  await checkDestinationMissions(user, checkTime);
  await checkComebackMissions(user, checkTime);
}

module.exports = {
  checkMissions,
};
