const logger = require('../../logger');
const { checkConsumed } = require('./checkConsumed');
const { checkProduced } = require('./checkProduced');

async function checkRessources(user) {
  logger.info(' 3 - Check Ressources');
  await checkConsumed(user);
  await checkProduced(user);
}

module.exports = {
  checkRessources,
};
