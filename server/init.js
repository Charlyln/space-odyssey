const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');

const { Planet } = require('./db/models/planet.model');
const { System } = require('./db/models/system.model');
const { Galaxy } = require('./db/models/galaxy.model');

const { solar_system_planets, alpha_centauri_systems } = require('./constants/modelData');
const { generateSystems, generatePlanets, randomIntFromInterval } = require('./helper/utils.helper');

async function createInitData() {
  try {
    const milky_way = await Galaxy.findAll();

    if (!milky_way || milky_way?.length === 0) {
      logger.info('Need to create init data');

      const milky_way = await Galaxy.create({
        name: 'Milky Way',
      });

      const solar_system = await System.create({
        name: 'Solar System',
        size: 800,
        sunSize: 200,
        sunColor: '#fae20a',
        sunShadow: 'orange',
        GalaxyId: milky_way.id,
      });

      await Promise.all(
        solar_system_planets.map(async (planet) => {
          await Planet.create({
            name: planet.name,
            temperature: planet.temperature,
            size: planet.size,
            danger: planet.danger,
            orbit: planet.orbit,
            speed: planet.speed,
            color: planet.color,
            SystemId: solar_system.id,
          });
        }),
      );

      await Promise.all(
        alpha_centauri_systems.map(async (system) => {
          const newSystem = await System.create({
            name: system.name,
            size: system.size,
            sunSize: system.sunSize,
            sunColor: system.sunColor,
            sunShadow: system.sunShadow,
            GalaxyId: milky_way.id,
          });

          const planetNbr = randomIntFromInterval(2, 8);

          const planets = generatePlanets(planetNbr, system.sunSize);

          await Promise.all(
            planets.map(async (planet) => {
              await Planet.create({
                name: planet.name,
                temperature: planet.temperature,
                size: planet.size,
                danger: planet.danger,
                orbit: planet.orbit,
                speed: planet.speed,
                color: planet.color,
                SystemId: newSystem.id,
              });
            }),
          );
        }),
      );

      // Andromeda

      const andromeda = await Galaxy.create({
        name: 'Andromeda',
      });

      const randomSystems = generateSystems(2);

      await Promise.all(
        randomSystems.map(async (system) => {
          const newSystem = await System.create({
            name: system.systemName,
            size: system.size,
            sunSize: system.sunSize,
            sunColor: system.sunColor,
            sunShadow: system.sunShadow,
            GalaxyId: andromeda.id,
          });

          await Promise.all(
            system.planets.map(async (planet) => {
              await Planet.create({
                name: planet.name,
                temperature: planet.temperature,
                size: planet.size,
                danger: planet.danger,
                orbit: planet.orbit,
                speed: planet.speed,
                color: planet.color,
                SystemId: newSystem.id,
              });
            }),
          );
        }),
      );
    } else {
      logger.info('Init data already created');
    }
  } catch (error) {
    logger.error('createInitData', error);
  }
}

module.exports = {
  createInitData,
};
