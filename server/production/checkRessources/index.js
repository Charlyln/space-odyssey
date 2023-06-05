const logger = require('../../logger');
const { checkConsumed } = require('./checkConsumed');
const { checkProduced } = require('./checkProduced');

async function checkRessources(user, checkProductionDate) {
  logger.info(' 3 - Check Ressources');
  await checkConsumed(user, checkProductionDate);
  await checkProduced(user, checkProductionDate);
}

module.exports = {
  checkRessources,
};
