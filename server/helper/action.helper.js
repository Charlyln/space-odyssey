const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { Building } = require('../db/models/building.model');
const { Spaceship } = require('../db/models/spaceship.model');
const { State } = require('../db/models/state.model');

const {
  incrementRessource,
  decrementMoney,
  createTrade,
  createMission,
  launchMission,
  comeBackMission,
  retreiveMission,
} = require('./model.helper');

async function handleActions(action) {
  try {
    let response;

    switch (action.type) {
      case 'UpgradeBuilding':
        response = await handleUpgradeBuilding(action);
        return response;

      case 'CancelBuilding':
        response = await handleCancelBuilding(action);
        return response;

      case 'BuildSpaceship':
        response = await handleBuildSpaceship(action);
        return response;

      case 'DeleteSpaceship':
        response = await handleDeleteSpaceship(action);
        return response;

      case 'BuyRessource':
        response = await handleBuyRessource(action);
        return response;

      case 'LaunchMission':
        response = await handleLaunchMission(action);
        return response;

      case 'ComeBackMission':
        response = await handleComeBackMission(action);
        return response;

      case 'RetreiveMission':
        response = await handleRetreiveMission(action);
        return response;

      default:
        return null;
    }
  } catch (error) {
    logger.error('handleActions', error);
  }
}

async function handleUpgradeBuilding(action) {
  try {
    const parameters = action.parameters;

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    await building.update({ upgrading: true });
    return building;
  } catch (error) {
    logger.error('UpgradeBuilding');
  }
}

async function handleCancelBuilding(action) {
  try {
    const parameters = action.parameters;

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    if (building.waiting) {
      building.update({ waiting: false, upgrading: false });
    }

    return building;
  } catch (error) {
    logger.error('UpgradeBuilding');
  }
}

async function handleBuildSpaceship(action) {
  try {
    const parameters = action.parameters;

    const spaceship = await Spaceship.create({
      id: uuidv4(),
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
      id: uuidv4(),
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

async function handleBuyRessource(action) {
  let parameters;
  try {
    const { id, quantity, price, name } = action.parameters;

    parameters = action.parameters;

    await incrementRessource(quantity, id);
    await decrementMoney(price, action.userId);

    const trade = await createTrade(name, price, quantity, 'success', 'purchase', action.userId);
    return trade;
  } catch (error) {
    const { quantity, price, name } = parameters;
    const trade = await createTrade(name, price, quantity, 'error', 'purchase', action.userId);
    logger.error('BuyRessource', error);
    return trade;
  }
}

async function handleLaunchMission(action) {
  let parameters;
  try {
    const { missionId } = action.parameters;

    const mission = await launchMission(missionId);
    return mission;
  } catch (error) {
    logger.error('LaunchMission', error);
  }
}

async function handleComeBackMission(action) {
  try {
    const { missionId } = action.parameters;

    const mission = await comeBackMission(missionId);
    return mission;
  } catch (error) {
    logger.error('handleComeBackMission', error);
  }
}

async function handleRetreiveMission(action) {
  try {
    const { missionId } = action.parameters;

    const mission = await retreiveMission(missionId);
    return mission;
  } catch (error) {
    logger.error('handleRetreiveMission', error);
  }
}

module.exports = {
  handleUpgradeBuilding,
  handleCancelBuilding,
  handleBuildSpaceship,
  handleDeleteSpaceship,
  handleActions,
  handleBuyRessource,
  handleLaunchMission,
  handleComeBackMission,
  handleRetreiveMission,
};
