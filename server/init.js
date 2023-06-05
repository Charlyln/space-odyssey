const { v4: uuidv4 } = require('uuid');

const { Cost } = require('./db/models/cost.model');
const { costs } = require('./constants/modelData');
const logger = require('./logger');

async function createInitData(name) {
  try {
    const cost = await Cost.findOne();

    if (!cost) {
      logger.info('Create init data');

      await Promise.all(
        costs.map(async (cost) => {
          await Cost.create({
            id: uuidv4(),
            craft: cost.craft,
            value: cost.value,
            ressource: cost.ressource,
          });
        }),
      );
    }
  } catch (error) {
    logger.error('createInitData', error);
  }
}

module.exports = {
  createInitData,
};
