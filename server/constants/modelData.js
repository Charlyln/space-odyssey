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
    production: 'steel',
  },
  {
    name: 'Gold Mine',
    type: 'production',
    enable: true,
    production: 'gold',
  },
  {
    name: 'Crystal Synthesizer',
    type: 'production',
    enable: true,
    production: 'crystal',
  },
  {
    name: 'Solar Plant',
    type: 'production',
    enable: true,
    production: 'energy',
  },
  {
    name: 'Research Center',
    type: 'research',
    enable: true,
    production: 'technology',
  },
  {
    name: 'Residential Sector',
    type: 'residential',
    enable: true,
    production: 'residential',
  },
  {
    name: 'Biosphere Farm',
    type: 'farm',
    enable: true,
    production: 'food',
  },
];

const costs = [
  {
    craft: 'Fighter',
    value: 50,
    ressource: 'steel',
  },
  {
    craft: 'Fighter',
    value: 20,
    ressource: 'gold',
  },
];

module.exports = {
  ressources,
  buildings,
  costs,
};
