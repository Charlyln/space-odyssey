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
    name: 'Crystal Synthesizer',
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
  buildings,
  spaceships,
};
