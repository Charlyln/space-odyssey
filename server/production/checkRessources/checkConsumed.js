const logger = require('../../logger');
const { Ressource } = require('../../db/models/ressource.model');

async function checkConsumed(user) {
  try {
    const workinguildings = user.Buildings.filter((building) => building.level > 0);

    if (workinguildings.length > 0) {
      const ressource = await Ressource.findOne({ where: { name: 'energy' } });
      console.log(ressource.value - workinguildings.length);
      await ressource.update({ value: ressource.value - workinguildings.length });
    }
  } catch (error) {
    logger.error('checkConsumed', error);
  }
}

module.exports = {
  checkConsumed,
};
