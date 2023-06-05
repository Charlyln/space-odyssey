const logger = require('../../../logger');
const { checkFacilitiesStart } = require('./checkFacilitiesStart');
const { checkFacilitiesProgress } = require('./checkFacilitiesProgress');
const { checkFacilitiesFinish } = require('./checkFacilitiesFinish');

async function checkFacilities(user, checkTime) {
  logger.info('   Check Facilities');

  await checkFacilitiesStart(user, checkTime);
  await checkFacilitiesProgress(user, checkTime);
  await checkFacilitiesFinish(user, checkTime);
}

module.exports = {
  checkFacilities,
};
