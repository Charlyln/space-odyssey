const logger = require('../logger');

const { User } = require('../db/models/user.model');
const { Ressource } = require('../db/models/ressource.model');
const { Building } = require('../db/models/building.model');
const { Battle } = require('../db/models/battle.model');
const { Mission } = require('../db/models/mission.model');
const { Info } = require('../db/models/info.model');
const { Research } = require('../db/models/research.model');
const { Spaceship } = require('../db/models/spaceship.model');
const { Planet } = require('../db/models/planet.model');

async function handleUpgradeBuilding(action) {
  try {
    logger.info('handleUpgradeBuilding');

    const parameters = JSON.parse(action.parameters);

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    const user = await User.findOne({
      where: { id: action.userId },
      order: [
        [{ model: Info }, 'createdAt', 'DESC'],
        [{ model: Building }, 'createdAt', 'ASC'],
      ],
      include: [
        {
          model: Ressource,
        },
        {
          model: Building,
        },
        {
          model: Battle,
        },
        {
          model: Mission,
        },
        {
          model: Info,
          order: [['createdAt', 'ASC']],
        },
        {
          model: Research,
        },
        {
          model: Spaceship,
        },
        {
          model: Planet,
        },
      ],
    });

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
    logger.error('UpgradeBuilding', error);
  }
}

module.exports = {
  handleUpgradeBuilding,
};
