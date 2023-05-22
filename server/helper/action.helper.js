const logger = require('../logger');

const { actionTypes } = require('../../enums');

const { handleCancelBuilding, handleUpgradeBuilding } = require('./building.helper');
const { handleBuildSpaceship, handleDeleteSpaceship } = require('./spaceship.helper');
const { handleStartMission, handleComeBackMission, handleRetreiveMission } = require('./mission.helper');

async function handleActions(action) {
  try {
    let response;

    const actionDate = new Date();

    switch (action.type) {
      case actionTypes.upgradeBuilding:
        response = await handleUpgradeBuilding(action, actionDate);
        return response;

      case actionTypes.cancelBuilding:
        response = await handleCancelBuilding(action, actionDate);
        return response;

      case actionTypes.buildSpaceship:
        response = await handleBuildSpaceship(action, actionDate);
        return response;

      case actionTypes.deleteSpaceship:
        response = await handleDeleteSpaceship(action, actionDate);
        return response;

      case actionTypes.buyRessource:
        response = await handleBuyRessource(action, actionDate);
        return response;

      case actionTypes.startMission:
        response = await handleStartMission(action, actionDate);
        return response;

      case actionTypes.comeBackMission:
        response = await handleComeBackMission(action, actionDate);
        return response;

      case actionTypes.retreiveMission:
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
