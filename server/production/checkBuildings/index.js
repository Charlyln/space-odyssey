const logger = require('../../logger');
const { checkFacilities } = require('./checkFacilities');
const { checkSpaceships } = require('./checkSpaceships');

async function checkBuildings(user, checkTime) {
  logger.info('Check Buildings');
  await checkSpaceships(user, checkTime);
  await checkFacilities(user, checkTime);
}

module.exports = {
  checkBuildings,
};
