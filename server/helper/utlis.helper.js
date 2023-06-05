const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { ressources, buildings, costs } = require('../constants/modelData');

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getrandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  randomColor = '#' + randomColor;
  return randomColor;
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
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
    speed: 12,
    color: '#a9a293',
  },
  {
    name: 'Venus',
    temperature: 19,
    size: 20,
    danger: 'low',
    orbit: 402,
    speed: 12,
    color: '#be7730',
  },
  {
    name: 'Earth',
    temperature: 19,
    size: 20,
    danger: 'high',
    orbit: 506,
    speed: 12,
    color: '#464f90',
  },
  {
    name: 'Mars',
    temperature: 19,
    size: 15,
    danger: 'low',
    orbit: 609,
    speed: 12,
    color: '#ed6f3e',
  },
  {
    name: 'Jupiter',
    temperature: 19,
    size: 50,
    danger: 'high',
    orbit: 738,
    speed: 12,
    color: '#8c7c65',
  },
  {
    name: 'Saturn',
    temperature: 19,
    size: 40,
    danger: 'low',
    orbit: 853,
    speed: 12,
    color: '#cba941',
  },
  {
    name: 'Uranus',
    temperature: 19,
    size: 30,
    danger: 'low',
    orbit: 935,
    speed: 12,
    color: '#94dcf0',
  },
  {
    name: 'Neptune',
    temperature: 19,
    size: 30,
    danger: '',
    orbit: 1031,
    speed: 12,
    color: '#0072a6',
  },
];

function generateSystems(systemNbr) {
  try {
    const systems = [];
    for (let i = 1; i <= systemNbr; i++) {
      const planetNbr = randomIntFromInterval(2, 8);
      const size = 800;
      const sunSize = 200;
      const systemName = makeid(6);
      const sunColor = getrandomColor();
      const sunShadow = getrandomColor();

      const planets = generatePlanets(planetNbr, sunSize);

      systems.push({ size, systemName, sunSize, sunColor, sunShadow, planets });
    }

    return systems;
  } catch (error) {
    logger.error('generateSystems', error);
  }
}

function generatePlanets(planetNbr, sunSize) {
  try {
    const planets = [];

    let orbitMaring = 0;
    let orbitCounter = 0;

    for (let i = 0; i < planetNbr; i++) {
      const newId = makeid(10);
      const randomColor = planetsColors[randomIntFromInterval(0, planetsColors.length - 1)];
      const randomSpeed = randomIntFromInterval(2, 30);
      const randomSize = randomIntFromInterval(15, 50);
      const randomOffset = randomIntFromInterval(10, 50);
      const randomTemperature = randomIntFromInterval(-100, 100);
      const randomDanger = dangers[randomIntFromInterval(0, 2)];

      const randomOrbit = sunSize + randomSize + orbitMaring + orbitCounter + randomOffset;
      orbitCounter = orbitCounter + randomSize + randomOffset;
      orbitMaring = orbitMaring + randomSize;

      planets.push({
        id: newId,
        name: newId,
        size: randomSize,
        orbit: randomOrbit,
        speed: randomSpeed,
        color: randomColor,
        temperature: randomTemperature,
        danger: randomDanger,
      });
    }

    return planets;
  } catch (error) {
    logger.error('generatePlanets', error);
  }
}

module.exports = {
  generateSystems,
  generatePlanets,
  alpha_centauri_systems,
  randomIntFromInterval,
  solar_system_planets,
};
