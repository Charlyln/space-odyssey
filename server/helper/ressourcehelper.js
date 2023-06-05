const logger = require('../logger');

const { Ressource } = require('../db/models/ressource.model');
const { Cost } = require('../db/models/cost.model');
const { Building } = require('../db/models/building.model');
const { State } = require('../db/models/state.model');

async function updateRessource(data, ressourceId) {
  try {
    await Ressource.update({ ...data }, { where: { id: ressourceId } });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

async function incrementRessource(value, ressourceId) {
  try {
    await Ressource.increment('value', { by: value, where: { id: ressourceId } });
  } catch (error) {
    logger.error('incrementRessource', error);
  }
}

async function decrementRessource(value, ressourceId) {
  try {
    await Ressource.increment('value', { by: -value, where: { id: ressourceId } });
  } catch (error) {
    logger.error('decrementRessource', error);
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

async function increaseCosts(costs) {
  try {
    await Promise.all(
      costs.map(async (cost) => {
        console.log(cost.value);
        await Cost.increment('value', { by: 10, where: { id: cost.id } });
      }),
    );
  } catch (error) {
    logger.error('increaseCosts', error);
  }
}

async function checkAvailableRessources(building, userId) {
  try {
    const costs = await Cost.findAll({
      where: { craft: building.name },
    });

    if (costs.length > 0) {
      const reponses = await Promise.all(
        costs.map(async (cost) => {
          const ressource = await Ressource.findOne({
            where: { name: cost.ressource, UserId: userId },
          });

          if (ressource.value >= cost.value) {
            return { response: true, value: cost.value, ressourceId: ressource.id };
          } else {
            return { response: false, value: cost.value, ressourceId: ressource.id };
          }
        }),
      );

      const checker = (arr) => arr.every((v) => v.response === true);

      if (checker(reponses)) {
        await Promise.all(
          reponses.map(async (reponse) => {
            await decrementRessource(reponse.value, reponse.ressourceId);
          }),
        );
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    logger.error('checkAvailableRessources', error);
    return false;
  }
}

module.exports = {
  updateRessource,
  updateBuilding,
  checkAvailableRessources,
  updateState,
  incrementRessource,
  decrementRessource,
  increaseCosts,
};
