const { incrementRessource } = require('../../helper/model.helper');
const logger = require('../../logger');

async function checkProduced(user, checkProductionDate) {
  logger.info(' 5 -      Check Produced');

  await Promise.all(
    user.Buildings.map(async (building) => {
      if (building.level > 0) {
        const production = building.level;
        const ressource = user.Ressources.find((ressource) => {
          return building.production === ressource.name;
        });

        if (ressource) {
          await incrementRessource(production, ressource.id);
        }
      }
    }),
  );
}

module.exports = {
  checkProduced,
};
