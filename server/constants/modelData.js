const ressources = [
  {
    name: 'steel',
    type: 'production',
    value: 100,
    production: 0,
    storage: 500,
  },
  {
    name: 'gold',
    type: 'production',
    value: 10,
    production: 0,
    storage: 50,
  },
  {
    name: 'plutonium',
    type: 'production',
    value: 1,
    production: 0,
    storage: 5,
  },
  {
    name: 'energy',
    type: 'production',
    value: 100,
    production: 0,
    storage: 100,
  },
  {
    name: 'food',
    type: 'production',
    value: 100,
    production: 0,
    storage: 100,
  },
  {
    name: 'people',
    type: '',
    value: 50,
    production: 0,
    storage: 60,
  },
];

const buildings = [
  {
    name: 'Steel Mine',
    type: 'production',
    enable: true,
  },
  {
    name: 'Gold Mine',
    type: 'production',
    enable: true,
  },
  {
    name: 'Plutonium Synthesizer',
    type: 'production',
    enable: true,
  },
  {
    name: 'Solar Plant',
    type: 'production',
    enable: true,
  },
  {
    name: 'Research Center',
    type: 'research',
    enable: true,
  },
  {
    name: 'Residential Sector',
    type: 'residential',
    enable: true,
  },
  {
    name: 'Biosphere Farm',
    type: 'farm',
    enable: true,
  },
];

const spaceships = [
  {
    name: 'Fighter',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 10,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Cruiser',
    type: 'attack',
    capacity: 10,
    transport: 10,
    attack: 20,
    defense: 10,
    speed: 10,
  },
  {
    name: 'BattleShip',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 50,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Bomber',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 100,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Cargo',
    type: 'transport',
    capacity: 5,
    transport: 5,
    attack: 110,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Crawler',
    type: 'transport',
    capacity: 5,
    transport: 5,
    attack: 120,
    defense: 10,
    speed: 10,
  },
];

module.exports = {
  ressources,
  buildings,
  spaceships,
};
