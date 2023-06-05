function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ressources = [
  {
    name: 'steel',
    type: 'production',
    value: 1000,
    production: 0,
    consumption: 0,
    storage: 500,
    price: 100,
  },
  {
    name: 'gold',
    type: 'production',
    value: 500,
    production: 0,
    consumption: 0,
    storage: 50,
    price: 200,
  },
  {
    name: 'crystal',
    type: 'production',
    value: 0,
    production: 0,
    consumption: 0,
    storage: 5,
    price: 2000,
  },
  {
    name: 'platinum',
    type: 'production',
    value: 0,
    production: 0,
    consumption: 0,
    storage: 5,
    price: 1000,
  },
  {
    name: 'energy',
    type: 'production',
    value: 1000,
    production: 0,
    consumption: 0,
    storage: 100,
    price: 100,
  },
  {
    name: 'food',
    type: 'production',
    value: 1000,
    production: 0,
    consumption: 0,
    storage: 100,
    price: 5,
  },
];

const buildings = [
  {
    name: 'Steel Mine',
    type: 'production',
    production: 'steel',
  },
  {
    name: 'Gold Mine',
    type: 'production',
    production: 'gold',
  },
  {
    name: 'Platinum Synthesizer',
    type: 'production',
    production: 'platinum',
  },
  {
    name: 'Crystal Synthesizer',
    type: 'production',
    production: 'crystal',
  },
  {
    name: 'Solar Plant',
    type: 'production',
    production: 'energy',
  },
  {
    name: 'Biosphere Farm',
    type: 'farm',
    production: 'food',
  },
  // {
  //   name: 'Research Center',
  //   type: 'research',
  //   production: 'technology',
  // },
  // {
  //   name: 'Residential Sector',
  //   type: 'residential',
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

const galaxies = [
  {
    name: 'Milky Way',
  },
  {
    name: 'Andromeda',
  },
];

const systems = [
  {
    name: 'Solar System',
  },
  {
    name: 'Alpha Centauri',
  },
];

const alpha_centauri_planets = [
  {
    name: 'Alf Cen B b',
    temperature: 23,
    danger: 'medium',
    size: 25,
    orbit: 250,
    speed: 30,
    color: '#9f4e17',
  },
  {
    name: 'HIP 70890 c',
    temperature: 37,
    danger: 1,
    size: 40,
    orbit: 500,
    speed: 40,
    color: '#4c4c77',
  },
  {
    name: 'HD 128621 c',
    temperature: -12,
    danger: 'low',
    size: 55,
    orbit: 380,
    speed: 20,
    color: 'grey',
  },
];

const missions = [
  {
    name: 'Alone Amidst the Stars',
    type: 'exploration',
    level: 1,
  },
  {
    name: 'For a few resources more',
    type: 'industrial',
    level: 1,
  },
  {
    name: 'A Leap in the Dark',
    type: 'exploration',
    level: 1,
  },
  {
    name: 'Lost in Space',
    type: 'exploration',
    level: 1,
  },
  {
    name: 'Ghosts in the Machine',
    type: 'combat',
    level: 1,
  },
  {
    name: 'The lost planet',
    type: 'exploration',
    level: 2,
  },
  {
    name: 'Rescue Dawn',
    type: 'combat',
    level: 3,
  },
  {
    name: 'The Negociator',
    type: 'trade',
    level: 3,
  },
  {
    name: 'Guardians of the Galaxy',
    type: 'combat',
    level: 4,
  },
  {
    name: 'Interstellar',
    type: 'exploration',
    level: 5,
  },
];

const dangers = ['low', 'medium', 'high'];
const planetsColors = ['#a9a293', '#be7730', '#464f90', '#ed6f3e', '#8c7c65', '#cba941', '#94dcf0', '#0072a6'];

const alpha_centauri_systems = [
  {
    name: 'Alpha A',
    size: 800,
    sunSize: 200,
    sunColor: '#fae20a',
    sunShadow: 'orange',
  },
  {
    name: 'Alpha B',
    size: 800,
    sunSize: 100,
    sunColor: 'red',
    sunShadow: 'orange',
  },
  {
    name: 'Alpha C',
    size: 400,
    sunSize: 200,
    sunColor: '#6fcbcd',
    sunShadow: '#00c7ff',
  },
  {
    name: 'Alpha H',
    size: 1200,
    sunSize: 800,
    sunColor: 'black',
    sunShadow: 'orange',
  },
];

const solar_system_planets = [
  {
    name: 'Mercury',
    temperature: 19,
    size: 15,
    danger: 'low',
    orbit: 263,
    speed: randomIntFromInterval(15, 30),
    color: '#a9a293',
  },
  {
    name: 'Venus',
    temperature: 19,
    size: 20,
    danger: 'low',
    orbit: 402,
    speed: randomIntFromInterval(15, 30),
    color: '#be7730',
  },
  {
    name: 'Earth',
    temperature: 19,
    size: 20,
    danger: 'high',
    orbit: 506,
    speed: randomIntFromInterval(15, 30),
    color: '#464f90',
  },
  {
    name: 'Mars',
    temperature: 19,
    size: 15,
    danger: 'low',
    orbit: 609,
    speed: randomIntFromInterval(15, 30),
    color: '#ed6f3e',
  },
  {
    name: 'Jupiter',
    temperature: 19,
    size: 50,
    danger: 'high',
    orbit: 738,
    speed: randomIntFromInterval(15, 30),
    color: '#8c7c65',
  },
  {
    name: 'Saturn',
    temperature: 19,
    size: 40,
    danger: 'low',
    orbit: 853,
    speed: randomIntFromInterval(15, 30),
    color: '#cba941',
  },
  {
    name: 'Uranus',
    temperature: 19,
    size: 30,
    danger: 'low',
    orbit: 935,
    speed: randomIntFromInterval(15, 30),
    color: '#94dcf0',
  },
  {
    name: 'Neptune',
    temperature: 19,
    size: 30,
    danger: '',
    orbit: 1031,
    speed: randomIntFromInterval(15, 30),
    color: '#0072a6',
  },
];

module.exports = {
  ressources,
  buildings,
  costs,
  galaxies,
  systems,
  alpha_centauri_planets,
  missions,
  dangers,
  planetsColors,
  alpha_centauri_systems,
  solar_system_planets,
};
