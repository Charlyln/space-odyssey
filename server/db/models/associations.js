const { User } = require('./user.model');

const { Check } = require('./check.model');

const { Ressource } = require('./ressource.model');
const { Building } = require('./building.model');
const { Mission } = require('./mission.model');
const { Info } = require('./info.model');
const { Research } = require('./research.model');
const { Spaceship } = require('./spaceship.model');
const { State } = require('./state.model');
const { Cost } = require('./cost.model');
const { Trade } = require('./trade.model');

const { Planet } = require('./planet.model');
const { System } = require('./system.model');
const { Galaxy } = require('./galaxy.model');

const { Colonist } = require('./colonist.model');
const { Money } = require('./money.model');

const options = {
  constraints: false,
  onDelete: 'CASCADE',
};

// User

User.hasMany(Ressource, options);
Ressource.belongsTo(User, options);

User.hasMany(Building, options);
Building.belongsTo(User, options);

User.hasMany(Mission, options);
Mission.belongsTo(User, options);

User.hasMany(Info, options);
Info.belongsTo(User, options);

User.hasMany(Research, options);
Research.belongsTo(User, options);

User.hasMany(Spaceship, options);
Spaceship.belongsTo(User, options);

User.hasMany(Cost, options);
Cost.belongsTo(User, options);

User.hasMany(Trade, options);
Trade.belongsTo(User, options);

User.hasMany(Colonist, options);
Colonist.belongsTo(User, options);

User.hasOne(Money, options);
Money.belongsTo(User, options);

// Others

Spaceship.hasOne(State, options);
State.belongsTo(Spaceship, options);

// Common

System.hasMany(Planet, options);
Planet.belongsTo(System, options);

Galaxy.hasMany(System, options);
System.belongsTo(Galaxy, options);

Planet.hasMany(User, options);
User.belongsTo(Planet, options);

(async () => {
  await User.sync();
  await Ressource.sync();
  await Building.sync();
  await Mission.sync();
  await Info.sync();
  await Research.sync();
  await Spaceship.sync();
  await Planet.sync();
  await Galaxy.sync();
  await State.sync();
  await Cost.sync();
  await Trade.sync();
  await System.sync();
  await Colonist.sync();
  await Money.sync();
  await Check.sync();
})();
