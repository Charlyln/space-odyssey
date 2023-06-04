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

const facilitiesStatus = {
  created: 'created',
  production: 'production',
  setup: 'setup',
  upgrading: 'upgrading',
  upgraded: 'upgraded',
  waiting: 'waiting',
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
  facilitiesStatus,
};
