const logger = require('../../logger');
const { checkFacilities } = require('./checkFacilities');
const { checkSpaceships } = require('./checkSpaceships');

async function checkBuildings(user, checkDate) {
  logger.info('Check Buildings');
  await checkSpaceships(user, checkDate);
  await checkFacilities(user, checkDate);
}

module.exports = {
  checkBuildings,
};
