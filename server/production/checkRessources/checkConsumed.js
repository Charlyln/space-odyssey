const logger = require('../../logger');
const { decrementRessource } = require('../../helper/model.helper');
const { getConsumedRessource } = require('../../helper/building.helper');

async function checkConsumed(user, prevTime, checkTime) {
  logger.info('   Check Consumed');
  try {
    const workingbuildings = user.Buildings.filter((building) => building.level > 0);
    const colonistsNbr = user.Colonists.length;
    const foodRessource = user.Ressources.find((ressource) => ressource.name === 'food');

    if (workingbuildings.length > 0) {
      const energyRessource = user.Ressources.find((ressource) => ressource.name === 'energy');
      const consumed = workingbuildings.length;
      await decrementRessource(consumed, energyRessource.id);
    }

    if (colonistsNbr > 0) {
      const consumed = getConsumedRessource(prevTime, checkTime, colonistsNbr);
      await decrementRessource(consumed, foodRessource.id);
    }
  } catch (error) {
    logger.error('checkConsumed', error);
  }
}

module.exports = {
  checkConsumed,
};
