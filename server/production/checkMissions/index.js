const logger = require('../../logger');
const { checkSetupMissions } = require('./checkSetupMissions');
const { checkLaunchedMissions } = require('./checkLaunchedMissions');
const { checkDestinationMissions } = require('./checkDestinationMissions');
const { checkComebackMissions } = require('./checkComebackMissions');

async function checkMissions(user, checkDate) {
  logger.info('Check Missions');
  await checkSetupMissions(user);
  await checkLaunchedMissions(user, checkDate);
  await checkDestinationMissions(user, checkDate);
  await checkComebackMissions(user, checkDate);
}

module.exports = {
  checkMissions,
};
