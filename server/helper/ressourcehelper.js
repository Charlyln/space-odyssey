const logger = require('../logger');

const { Ressource } = require('../db/models/ressource.model');

async function updateRessource(ressourceId, data) {
  try {
    await Ressource.update({ ...data }, { where: { id: ressourceId } });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

module.exports = {
  updateRessource,
};
