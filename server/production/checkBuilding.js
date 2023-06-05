const logger = require('../logger');
const { checkFacilities } = require('./checkBuilding/checkFacilities');
const { checkSpaceships } = require('./checkBuilding/checkSpaceships');

async function checkBuilding(user) {
  logger.info('5 - Check Building');
  await checkSpaceships(user);
  await checkFacilities(user);
}

module.exports = {
  checkBuilding,
};
