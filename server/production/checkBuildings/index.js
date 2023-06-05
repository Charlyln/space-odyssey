const logger = require('../../logger');
const { checkFacilities } = require('./checkFacilities');
const { checkSpaceships } = require('./checkSpaceships');

async function checkBuildings(user, checkProductionDate) {
  logger.info(' 6  - Check Building');
  await checkSpaceships(user, checkProductionDate);
  await checkFacilities(user, checkProductionDate);
}

module.exports = {
  checkBuildings,
};
