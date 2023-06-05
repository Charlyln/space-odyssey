const { User } = require('./user.model');
const { Ressource } = require('./ressource.model');
const { Building } = require('./building.model');

const options = {
  constraints: false,
  onDelete: 'CASCADE',
};

User.hasMany(Ressource, options);
Ressource.belongsTo(User, options);

User.hasMany(Building, options);
Building.belongsTo(User, options);
