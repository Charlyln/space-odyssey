const logger = require('../logger');

const { Ressource } = require('../db/models/ressource.model');
const { Cost } = require('../db/models/cost.model');
const { sendInfo } = require('./userhelper');
const { Building } = require('../db/models/building.model');
const { State } = require('../db/models/state.model');

async function updateRessource(data, ressourceId) {
  try {
    await Ressource.update({ ...data }, { where: { id: ressourceId } });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

async function updateBuilding(data, buildingId) {
  try {
    await Building.update({ ...data }, { where: { id: buildingId } });
  } catch (error) {
    logger.error('updatebuilding', error);
  }
}

async function updateState(data, stateId) {
  try {
    await State.update({ ...data }, { where: { id: stateId } });
  } catch (error) {
    logger.error('updateState', error);
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

      return { enoughtRessources, ressources };
    }
  } catch (error) {
    logger.error('checkAvailableRessources', error);
  }
}

module.exports = {
  updateRessource,
  updateBuilding,
  checkAvailableRessources,
  updateState,
};
