const logger = require('../logger');

const { productionDivider, consumptionDivider } = require('enums/game');

function getProducedRessource(time, checkTime, output) {
  try {
    const production = ((checkTime - time) * output) / productionDivider;
    const roundedProduction = Math.round(production);

    return roundedProduction;
  } catch (error) {
    logger.error('getProducedRessource');
  }
}

function getConsumedRessource(prevTime, checkTime, colonistsNbr) {
  try {
    const consumption = ((checkTime - prevTime) * colonistsNbr) / consumptionDivider;
    const roundedconsumption = Math.round(consumption);

    return roundedconsumption;
  } catch (error) {
    logger.error('getProducedRessource');
  }
}

module.exports = {
  getProducedRessource,
  getConsumedRessource,
};
