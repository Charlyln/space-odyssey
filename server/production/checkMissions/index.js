const logger = require('../../logger');
const { checkLaunchMissions } = require('./checkLaunchMissions');
const { checkOngoingMissions } = require('./checkOngoingMissions');

async function checkMissions(user) {
  logger.info(' 9 - Check Missions');
  await checkLaunchMissions(user);
  await checkOngoingMissions(user);
}

module.exports = {
  checkMissions,
};
