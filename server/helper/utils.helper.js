const { dangers, planetsColors } = require('../constants/modelData');
const logger = require('../logger');

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}h : ${padTo2Digits(minutes)} m : ${padTo2Digits(seconds)} s`;
}

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

function getPercentProgress(time, duration, checkTime) {
  const diff = checkTime - time;
  const percent = ((100 * diff) / duration).toFixed(2);
  return percent;
}

function getNewDuration(comebacktime, startTime, duration) {
  const diff = comebacktime - startTime;
  const rest = duration - diff;
  const newDuration = duration - rest;

  return newDuration;
}

module.exports = {
  generateSystems,
  generatePlanets,
  randomIntFromInterval,
  getPercentProgress,
  convertMsToTime,
  getNewDuration,
};
