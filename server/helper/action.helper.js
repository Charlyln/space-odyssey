const logger = require('../logger');

const { handleCancelBuilding, handleUpgradeBuilding } = require('./building.helper');
const { handleBuildSpaceship, handleDeleteSpaceship } = require('./spaceship.helper');
const { handleStartMission, handleComeBackMission, handleRetreiveMission } = require('./mission.helper');

async function handleActions(action) {
  try {
    let response;

    const actionDate = new Date().getTime();

    switch (action.type) {
      case 'UpgradeBuilding':
        response = await handleUpgradeBuilding(action, actionDate);
        return response;

      case 'CancelBuilding':
        response = await handleCancelBuilding(action, actionDate);
        return response;

      case 'BuildSpaceship':
        response = await handleBuildSpaceship(action, actionDate);
        return response;

      case 'DeleteSpaceship':
        response = await handleDeleteSpaceship(action, actionDate);
        return response;

      case 'BuyRessource':
        response = await handleBuyRessource(action, actionDate);
        return response;

      case 'StartMission':
        response = await handleStartMission(action, actionDate);
        return response;

      case 'ComeBackMission':
        response = await handleComeBackMission(action, actionDate);
        return response;

      case 'RetreiveMission':
        response = await handleRetreiveMission(action, actionDate);
        return response;

      default:
        return null;
    }
  } catch (error) {
    logger.error('handleActions', error);
  }
}

module.exports = {
  handleActions,
};
