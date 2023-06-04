const logger = require('../logger');

const { productionDivider } = require('enums/general');

function getProducedRessource(time, checkTime, output) {
  try {
    const production = ((checkTime - time) * output) / productionDivider;
    const roundedProduction = Math.round(production);

    return roundedProduction;
  } catch (error) {
    logger.error('getProducedRessource');
  }
}

function getConsumedRessource(time, checkTime, output) {
  try {
    const production = ((checkTime - time) * output) / productionDivider;
    const roundedProduction = Math.round(production);

    return roundedProduction;
  } catch (error) {
    logger.error('getProducedRessource');
  }
}

module.exports = {
  getProducedRessource,
  getConsumedRessource,
};
