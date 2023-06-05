const missionStatus = {
  created: 'created',
  setup: 'setup',
  launched: 'launched',
  destination: 'destination',
  comeback: 'comeback',
  issue: 'issue',
  finish: 'finish',
  retreived: 'retreived',
};

const actionTypes = {
  upgradeBuilding: 'upgradeBuilding',
  cancelBuilding: 'cancelBuilding',
  buildSpaceship: 'buildSpaceship',
  deleteSpaceship: 'deleteSpaceship',
  buyRessource: 'buyRessource',
  startMission: 'startMission',
  comeBackMission: 'comeBackMission',
  retreiveMission: 'retreiveMission',
};

module.exports = {
  missionStatus,
  actionTypes,
};
