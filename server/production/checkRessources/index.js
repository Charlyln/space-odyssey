const logger = require('../../logger');
const { checkConsumed } = require('./checkConsumed');
const { checkProduced } = require('./checkProduced');

async function checkRessources(user, checkDate) {
  logger.info('Check Ressources');
  await checkConsumed(user, checkDate);
  await checkProduced(user, checkDate);
}

module.exports = {
  checkRessources,
};
