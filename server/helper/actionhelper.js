const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { Building } = require('../db/models/building.model');
const { Info } = require('../db/models/info.model');

const { getUserData } = require('./userhelper');
const { Spaceship } = require('../db/models/spaceship.model');
const { State } = require('../db/models/state.model');

async function handleUpgradeBuilding(action) {
  try {
    logger.info('handleUpgradeBuilding');

    const parameters = JSON.parse(action.parameters);

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    const user = await getUserData(building.UserId);

    await Promise.all(
      user.Ressources.map(async (ressource) => {
        if (ressource.name !== 'people') {
          ressource.update({ value: ressource.value - 30 * building.level });
        }
      }),
    );

    building.update({ upgrading: true });

    const infoId = uuidv4();

    const infoData = {
      id: infoId,
      message: `${building.name} start upgrade`,
      severity: 'info',
    };

    global.io.to(global.socketIds[user.id]).emit('info', {
      ...infoData,
    });

    await Info.create({
      ...infoData,
      UserId: user.id,
    });
  } catch (error) {
    logger.error('UpgradeBuilding');
  }
}

async function handleBuildSpaceship(action) {
  try {
    logger.info('handleBuildSpaceship');

    const parameters = JSON.parse(action.parameters);

    const spaceship = await Spaceship.create({
      id: uuidv4(),
      name: parameters.spaceship.name,
      type: parameters.spaceship.type,
      capacity: parameters.spaceship.capacity,
      transport: parameters.spaceship.transport,
      attack: parameters.spaceship.attack,
      defense: parameters.spaceship.defense,
      speed: parameters.spaceship.speed,
      UserId: action.UserId,
    });

    await State.create({
      id: uuidv4(),
      building: true,
      SpaceshipId: spaceship.id,
    });
  } catch (error) {
    logger.error('BuildSpaceship', error);
  }
}

module.exports = {
  handleUpgradeBuilding,
  handleBuildSpaceship,
};
