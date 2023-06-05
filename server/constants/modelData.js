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
    name: 'crystal',
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

module.exports = {
  ressources,
  buildings,
};
