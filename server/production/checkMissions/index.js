const logger = require('../../logger');
const { checkSetupMissions } = require('./checkSetupMissions');
const { checkLaunchedMissions } = require('./checkLaunchedMissions');
const { checkDestinationMissions } = require('./checkDestinationMissions');
const { checkComebackMissions } = require('./checkComebackMissions');

async function checkMissions(user, checkProductionDate) {
  logger.info(' 9 - Check Missions');
  await checkSetupMissions(user);
  await checkLaunchedMissions(user, checkProductionDate);
  await checkDestinationMissions(user, checkProductionDate);
  await checkComebackMissions(user, checkProductionDate);
}

module.exports = {
  checkMissions,
};
