const { facilitiesStatus } = require('enums');
const { sendInfo } = require('../../../helper/model.helper');
const { checkAvailableRessources, updateBuilding } = require('../../../helper/model.helper');
const logger = require('../../../logger');

async function checkFacilitiesStart(user, checkDate) {
  logger.info('      Check Start');
  try {
    const setupBuildings = user.Buildings.filter((building) => building.status === facilitiesStatus.setup);

    if (setupBuildings.length > 0) {
      const building = setupBuildings[0];
      const enoughtRessources = await checkAvailableRessources(building, user.id);

      if (!enoughtRessources) {
        if (building.status !== facilitiesStatus.waiting) {
          await updateBuilding({ status: facilitiesStatus.waiting }, building.id);
          const message = `Wait for ressources until build ${building.name}`;
          await sendInfo(user.id, 'warning', message, 'building');
        } else {
          // wait until ressources
        }
      } else {
        await updateBuilding({ status: facilitiesStatus.upgrading, startTime: checkDate }, building.id);
        const message = `${building.name} start upgrading`;
        await sendInfo(user.id, 'info', message, 'upgrading');
      }
    }
  } catch (error) {
    logger.error('checkFacilitiesStart', error);
  }
}

module.exports = {
  checkFacilitiesStart,
};
