const logger = require('../../../logger');
const { checkFacilitiesStart } = require('./checkFacilitiesStart');
const { checkFacilitiesProgress } = require('./checkFacilitiesProgress');
const { checkFacilitiesFinish } = require('./checkFacilitiesFinish');

async function checkFacilities(user, checkDate) {
  logger.info('   Check Facilities');

  await checkFacilitiesStart(user, checkDate);
  await checkFacilitiesProgress(user, checkDate);
  await checkFacilitiesFinish(user, checkDate);
}

module.exports = {
  checkFacilities,
};
