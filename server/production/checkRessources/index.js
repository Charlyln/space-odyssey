const logger = require('../../logger');
const { checkConsumed } = require('./checkConsumed');
const { checkProduced } = require('./checkProduced');

async function checkRessources(user, prevTime, checkTime) {
  logger.info('Check Ressources');
  await checkConsumed(user, prevTime, checkTime);
  await checkProduced(user, prevTime, checkTime);
}

module.exports = {
  checkRessources,
};
