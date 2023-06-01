const logger = require('../../logger');

const { facilitiesStatus } = require('enums');
const { getProducedRessource } = require('../../helper/building.helper');
const { updateBuilding, incrementRessource } = require('../../helper/model.helper');

async function checkProduced(user, checkDate) {
  logger.info('      Check Produced');
  try {
    const productionBuildings = user.Buildings.filter((building) => building.status === facilitiesStatus.production);

    if (productionBuildings.length > 0) {
      await Promise.all(
        productionBuildings.map(async (building) => {
          if (building.level > 0) {
            const ressource = user.Ressources.find((ressource) => {
              return building.production === ressource.name;
            });

            const produced = getProducedRessource(building.startTime, checkDate, building.output);

            logger.warn('building.output', building.output)
            await updateBuilding({ startTime: checkDate }, building.id);

            if (ressource && produced > 0) {
              await incrementRessource(produced, ressource.id);
            }
          }
        }),
      );
    }
  } catch (error) {
    logger.error('checkFacilitiesStart', error);
  }
}

module.exports = {
  checkProduced,
};
