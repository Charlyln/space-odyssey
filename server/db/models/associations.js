const { User } = require('./user.model');

const { Ressource } = require('./ressource.model');
const { Building } = require('./building.model');
const { Battle } = require('./battle.model');
const { Mission } = require('./mission.model');
const { Research } = require('./research.model');
const { Spaceship } = require('./spaceship.model');

const { Planet } = require('./planet.model');
const { Galaxy } = require('./galaxy.model');

const options = {
  constraints: false,
  onDelete: 'CASCADE',
};

User.hasMany(Ressource, options);
Ressource.belongsTo(User, options);

User.hasMany(Building, options);
Building.belongsTo(User, options);

User.hasMany(Battle, options);
Battle.belongsTo(User, options);

User.hasMany(Mission, options);
Mission.belongsTo(User, options);

User.hasMany(Research, options);
Research.belongsTo(User, options);

User.hasMany(Spaceship, options);
Spaceship.belongsTo(User, options);

User.hasMany(Planet, options);
Planet.belongsTo(User, options);

Galaxy.hasMany(Planet, options);
Planet.belongsTo(Galaxy, options);
