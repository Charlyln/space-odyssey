const logger = require('../../logger');
const { checkLaunchMissions } = require('./checkLaunchMissions');
const { checkOngoingMissions } = require('./checkOngoingMissions');

async function checkMissions(user, checkProductionDate) {
  logger.info(' 9 - Check Missions');
  await checkLaunchMissions(user, checkProductionDate);
  await checkOngoingMissions(user, checkProductionDate);
}

module.exports = {
  checkMissions,
};
