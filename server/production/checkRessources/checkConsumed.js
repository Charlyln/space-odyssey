const logger = require('../../logger');
const { decrementRessource } = require('../../helper/ressourcehelper');

async function checkConsumed(user) {
  try {
    const workingbuildings = user.Buildings.filter((building) => building.level > 0);
    const workingPeople = user.Ressources.find((ressource) => ressource.name === 'people');
    const foodRessource = user.Ressources.find((ressource) => ressource.name === 'food');

    if (workingbuildings.length > 0) {
      const energyRessource = user.Ressources.find((ressource) => ressource.name === 'energy');
      const consumed = workingbuildings.length;
      await decrementRessource(consumed, energyRessource.id);
    }

    if (workingPeople.value > 0) {
      const consumed = workingPeople.value;
      await decrementRessource(consumed, foodRessource.id);
    }
  } catch (error) {
    logger.error('checkConsumed', error);
  }
}

module.exports = {
  checkConsumed,
};