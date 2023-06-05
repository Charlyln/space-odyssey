const { checkConsumed } = require('./checkRessources/checkConsumed');
const { checkProduced } = require('./checkRessources/checkProduced');

async function checkRessources(user) {
  await checkConsumed(user);
  await checkProduced(user);
}

module.exports = {
  checkRessources,
};
