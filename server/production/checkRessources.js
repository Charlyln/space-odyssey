const logger = require('../logger');
const { checkConsumed } = require('./checkRessources/checkConsumed');
const { checkProduced } = require('./checkRessources/checkProduced');

async function checkRessources(user) {
  logger.info('2 - Check Ressources');
  await checkConsumed(user);
  await checkProduced(user);
}

module.exports = {
  checkRessources,
};
