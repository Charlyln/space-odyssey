const logger = require('../../logger');
const { checkFacilities } = require('./checkFacilities');
const { checkSpaceships } = require('./checkSpaceships');

async function checkBuildings(user) {
  logger.info(' 6  - Check Building');
  await checkSpaceships(user);
  await checkFacilities(user);
}

module.exports = {
  checkBuildings,
};
