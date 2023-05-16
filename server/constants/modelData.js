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
    value: 0,
    production: 0,
    storage: 5,
  },
  {
    name: 'platinum',
    type: 'production',
    value: 0,
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
    order: 1,
  },
  {
    name: 'Gold Mine',
    type: 'production',
    enable: true,
    production: 'gold',
    order: 2,
  },
  {
    name: 'Platinum Synthesizer',
    type: 'production',
    enable: true,
    production: 'platinum',
    order: 3,
  },
  {
    name: 'Crystal Synthesizer',
    type: 'production',
    enable: true,
    production: 'crystal',
    order: 4,
  },
  {
    name: 'Solar Plant',
    type: 'production',
    enable: true,
    production: 'energy',
    order: 5,
  },
  {
    name: 'Biosphere Farm',
    type: 'farm',
    enable: true,
    production: 'food',
    order: 6,
  },
  // {
  //   name: 'Research Center',
  //   type: 'research',
  //   enable: true,
  //   production: 'technology',
  // },
  // {
  //   name: 'Residential Sector',
  //   type: 'residential',
  //   enable: true,
  //   production: 'residential',
  // },
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
  {
    craft: 'Cruiser',
    value: 200,
    ressource: 'steel',
  },
  {
    craft: 'Cruiser',
    value: 50,
    ressource: 'gold',
  },
  {
    craft: 'BattleShip',
    value: 800,
    ressource: 'steel',
  },
  {
    craft: 'BattleShip',
    value: 400,
    ressource: 'gold',
  },
  {
    craft: 'BattleShip',
    value: 200,
    ressource: 'platinum',
  },
  {
    craft: 'Bomber',
    value: 10000,
    ressource: 'steel',
  },
  {
    craft: 'Bomber',
    value: 7000,
    ressource: 'gold',
  },
  {
    craft: 'Bomber',
    value: 2500,
    ressource: 'platinum',
  },
  {
    craft: 'Bomber',
    value: 200,
    ressource: 'crystal',
  },
  {
    craft: 'Cargo',
    value: 200000,
    ressource: 'steel',
  },
  {
    craft: 'Cargo',
    value: 900000,
    ressource: 'gold',
  },
  {
    craft: 'Cargo',
    value: 25000,
    ressource: 'platinum',
  },
  {
    craft: 'Cargo',
    value: 12000,
    ressource: 'crystal',
  },
  {
    craft: 'Crawler',
    value: 900000,
    ressource: 'steel',
  },
  {
    craft: 'Crawler',
    value: 700000,
    ressource: 'gold',
  },
  {
    craft: 'Crawler',
    value: 350000,
    ressource: 'platinum',
  },
  {
    craft: 'Crawler',
    value: 270000,
    ressource: 'crystal',
  },
  {
    craft: 'Steel Mine',
    value: 50,
    ressource: 'steel',
  },
  {
    craft: 'Steel Mine',
    value: 20,
    ressource: 'gold',
  },
  {
    craft: 'Gold Mine',
    value: 50,
    ressource: 'steel',
  },
  {
    craft: 'Gold Mine',
    value: 20,
    ressource: 'gold',
  },
  {
    craft: 'Platinum Synthesizer',
    value: 500,
    ressource: 'steel',
  },
  {
    craft: 'Platinum Synthesizer',
    value: 200,
    ressource: 'gold',
  },
  {
    craft: 'Crystal Synthesizer',
    value: 500,
    ressource: 'steel',
  },
  {
    craft: 'Crystal Synthesizer',
    value: 200,
    ressource: 'gold',
  },
  {
    craft: 'Solar Plant',
    value: 50,
    ressource: 'steel',
  },
  {
    craft: 'Solar Plant',
    value: 20,
    ressource: 'gold',
  },
  {
    craft: 'Biosphere Farm',
    value: 50,
    ressource: 'steel',
  },
  {
    craft: 'Biosphere Farm',
    value: 20,
    ressource: 'gold',
  },
];

module.exports = {
  ressources,
  buildings,
  costs,
};