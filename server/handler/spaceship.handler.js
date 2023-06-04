const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { Spaceship } = require('../db/models/spaceship.model');
const { State } = require('../db/models/state.model');

async function handleBuildSpaceship(action) {
  try {
    const parameters = action.parameters;

    const spaceship = await Spaceship.create({
      name: parameters.spaceship.name,
      type: parameters.spaceship.type,
      capacity: parameters.spaceship.capacity,
      transport: parameters.spaceship.transport,
      attack: parameters.spaceship.attack,
      defense: parameters.spaceship.defense,
      speed: parameters.spaceship.speed,
      UserId: action.userId,
    });

    const state = await State.create({
      building: true,
      SpaceshipId: spaceship.id,
    });

    return { ...spaceship.dataValues, State: state };
  } catch (error) {
    logger.error('BuildSpaceship', error);
  }
}

async function handleDeleteSpaceship(action) {
  try {
    const parameters = action.parameters;

    await Spaceship.destroy({
      where: {
        id: parameters.spaceshipId,
      },
    });

    return parameters.spaceshipId;
  } catch (error) {
    logger.error('DeleteSpaceship', error);
  }
}

module.exports = {
  handleBuildSpaceship,
  handleDeleteSpaceship,
};
