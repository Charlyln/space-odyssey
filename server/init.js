const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');

const { Planet } = require('./db/models/planet.model');
const { System } = require('./db/models/system.model');
const { Galaxy } = require('./db/models/galaxy.model');
const { planets } = require('./constants/modelData');

async function createInitData() {
  try {
    logger.info('Create init data');

    const milky_way = await Galaxy.create({
      id: uuidv4(),
      name: 'Milky Way',
    });

    const andromeda = await Galaxy.create({
      id: uuidv4(),
      name: 'Andromeda',
    });

    const solar_system = await System.create({
      id: uuidv4(),
      name: 'Solar System',
      GalaxyId: milky_way.id,
    });

    const alpha_centauri = await System.create({
      id: uuidv4(),
      name: 'Alpha Centauri',
      GalaxyId: milky_way.id,
    });

    await Promise.all(
      planets.map(async (planet) => {
        await Planet.create({
          id: uuidv4(),
          name: planet.name,
          temperature: planet.temperature,
          size: planet.size,
          danger: planet.danger,
          orbit: planet.orbit,
          speed: planet.speed,
          color: planet.color,
          SystemId: alpha_centauri.id,
        });
      }),
    );
  } catch (error) {
    logger.error('createInitData', error);
  }
}

module.exports = {
  createInitData,
};
