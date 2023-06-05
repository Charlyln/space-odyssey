const logger = require('../logger');

const { Ressource } = require('../db/models/ressource.model');
const { Cost } = require('../db/models/cost.model');
const { sendInfo } = require('./userhelper');
const { Building } = require('../db/models/building.model');

async function updateRessource(data, ressourceId) {
  try {
    await Ressource.update({ ...data }, { where: { id: ressourceId } });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

async function checkAvailableRessources(building, userId) {
  try {
    const costs = await Cost.findAll({
      where: { craft: building.name },
    });

    let enoughtRessources = true;

    const ressources = [];

    if (costs.length > 0) {
      await Promise.all(
        costs.map(async (cost) => {
          const ressource = await Ressource.findOne({
            where: { name: cost.ressource },
          });

          if (ressource.value >= cost.value) {
            ressources.push({ ressource, cost: cost.value });
          } else {
            enoughtRessources = false;
          }
        }),
      );

      if (!enoughtRessources) {
        // const message = `Not enought ressources for ${buildingName} !`;
        // await sendInfo(userId, 'warning', message);
      } else {
        await Promise.all(
          ressources.map(async (ressource) => {
            await updateRessource({ value: ressource.ressource.value - ressource.cost }, ressource.ressource.id);
          }),
        );

        const newProgress = building.progress + 10;

        await Building.update(
          { progress: newProgress },
          {
            where: {
              id: building.id,
            },
          },
        );

        const message = `${building.name} start building`;
        await sendInfo(userId, 'info', message);
      }
    }
  } catch (error) {
    logger.error('checkAvailableRessources', error);
  }
}

module.exports = {
  updateRessource,
  checkAvailableRessources,
};
