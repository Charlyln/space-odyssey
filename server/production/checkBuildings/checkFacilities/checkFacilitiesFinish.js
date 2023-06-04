const { facilitiesStatus } = require('enums');
const { sendInfo } = require('../../../helper/model.helper');
const { updateBuilding, increaseCosts, updateRessourceProduction } = require('../../../helper/model.helper');
const logger = require('../../../logger');

async function checkFacilitiesFinish(user, checkDate) {
  logger.info('      Check Finish');
  try {
    const upgradingBuildings = user.Buildings.filter((building) => building.status === facilitiesStatus.upgraded);

    if (upgradingBuildings.length > 0) {
      const building = upgradingBuildings[0];

      const newLevel = building.level + 1;
      const multiplier = newLevel * newLevel;
      const newOutput = building.output * multiplier;
      await updateBuilding(
        {
          progress: 0,
          status: facilitiesStatus.production,
          level: newLevel,
          duration: building.duration * multiplier,
          output: newOutput,
        },
        building.id,
      );
      await updateRessourceProduction(newOutput, building.production, user.id);
      const costs = user.Costs.filter((cost) => cost.craft === building.name);
      await increaseCosts(costs);
      const message = `${building.name} upgraded to level ${building.level + 1}`;
      await sendInfo(user.id, 'success', message, 'building');
    }
  } catch (error) {
    logger.error('checkFacilitiesFinish', error);
  }
}

module.exports = {
  checkFacilitiesFinish,
};
