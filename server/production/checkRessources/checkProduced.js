const logger = require('../../logger');

const { facilitiesStatus } = require('enums/status');
const { getProducedRessource } = require('../../helper/building.helper');
const { incrementRessource } = require('../../helper/model.helper');

async function checkProduced(user, prevTime, checkTime) {
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
            const produced = getProducedRessource(prevTime, checkTime, building.output);

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
