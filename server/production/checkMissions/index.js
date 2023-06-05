const logger = require('../../logger');
const { checkLaunchMissions } = require('./checkLaunchMissions');
const { checkOngoingMissions } = require('./checkOngoingMissions');
const { checkComebackMissions } = require('./checkComebackMissions');

async function checkMissions(user, checkProductionDate) {
  logger.info(' 9 - Check Missions');
  await checkLaunchMissions(user, checkProductionDate);
  await checkOngoingMissions(user, checkProductionDate);
  await checkComebackMissions(user, checkProductionDate);
}

module.exports = {
  checkMissions,
};
