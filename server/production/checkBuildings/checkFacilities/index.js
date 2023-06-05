const logger = require('../../../logger');
const { checkFacilitiesStart } = require('./checkFacilitiesStart');
const { checkFacilitiesProgress } = require('./checkFacilitiesProgress');

async function checkFacilities(user, checkDate) {
  logger.info('   Check Facilities');

  await checkFacilitiesStart(user, checkDate);
  await checkFacilitiesProgress(user, checkDate);
}

module.exports = {
  checkFacilities,
};
