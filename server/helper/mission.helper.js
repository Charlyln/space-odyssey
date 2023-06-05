const logger = require('../logger');

const { startMission, comeBackMission, retreiveMission } = require('./model.helper');

async function handleStartMission(action, actionDate) {
  try {
    const { missionId } = action.parameters;
    const mission = await startMission(missionId, actionDate);
    return mission;
  } catch (error) {
    logger.error('StartMission', error);
  }
}

async function handleComeBackMission(action, actionDate) {
  try {
    const { missionId } = action.parameters;

    const mission = await comeBackMission(missionId, actionDate);
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
  handleComeBackMission,
  handleRetreiveMission,
  handleStartMission,
};
