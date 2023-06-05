const logger = require('../logger');

const { Building } = require('../db/models/building.model');
const { Info } = require('../db/models/info.model');

const { getUserData } = require('./userhelper');

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
    logger.error('UpgradeBuilding', error);
  }
}

module.exports = {
  handleUpgradeBuilding,
};
