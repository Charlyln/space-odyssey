import fighter from '../assets/spaceships/fighter.jpeg';
import cruiser from '../assets/spaceships/cruiser.jpeg';
import battleShip from '../assets/spaceships/battleship.jpeg';
import bomber from '../assets/spaceships/bomber.jpeg';
import cargo from '../assets/spaceships/cargo.jpeg';
import crawler from '../assets/spaceships/crawler.jpeg';
import factory from '../assets/facilities/factory.jpeg';
import factory2 from '../assets/facilities/factory2.jpeg';
import farm from '../assets/facilities/farm.jpeg';
import solar from '../assets/facilities/solar.jpeg';
import synthesizer from '../assets/facilities/synthesizer.jpeg';
import platinumsynthesizer from '../assets/facilities/platinumsynthesizer.jpeg';
import defence from '../assets/headers/defence.jpeg';
import shipyard from '../assets/headers/shipyard.jpeg';
import ressources from '../assets/headers/ressources.jpeg';
import missions from '../assets/headers/missions.jpeg';
import history from '../assets/headers/history.jpeg';
import trade from '../assets/headers/trade.jpeg';
import galaxy from '../assets/headers/galaxy.jpeg';
import planet from '../assets/headers/planet.jpeg';
import research from '../assets/headers/research.jpeg';
import facilities from '../assets/headers/facilities.jpeg';
import storage from '../assets/headers/storage.jpeg';
import overview from '../assets/headers/overview.jpeg';
import steelIcon from '../assets/ressources/steel.webp';
import goldIcon from '../assets/ressources/gold.webp';
import platinumIcon from '../assets/ressources/platinum2.webp';
import crystalIcon from '../assets/ressources/crystal.webp';
import energyIcon from '../assets/ressources/energy.webp';
import foodIcon from '../assets/ressources/food.webp';
import peopleIcon from '../assets/ressources/people.webp';
import spaceshipIcon from '../assets/ressources/spaceship.webp';
import cargoIcon from '../assets/ressources/cargo.webp';
import galaxyIcon from '../assets/ressources/galaxy.webp';
import waveIcon from '../assets/ressources/wave.webp';

export const getImg = (name) => {
  switch (name) {
    case 'defence':
      return defence;

    case 'galaxy':
      return galaxy;

    case 'trade':
      return trade;

    case 'history':
      return history;

    case 'missions':
      return missions;

    case 'overview':
      return overview;

    case 'storage':
      return storage;

    case 'facilities':
      return facilities;

    case 'research':
      return research;

    case 'planet':
      return planet;

    case 'ressources':
      return ressources;

    case 'shipyard':
      return shipyard;

    case 'Fighter':
      return fighter;

    case 'Cruiser':
      return cruiser;

    case 'BattleShip':
      return battleShip;

    case 'Bomber':
      return bomber;

    case 'Cargo':
      return cargo;

    case 'Crawler':
      return crawler;

    case 'Steel Mine':
      return factory;

    case 'Gold Mine':
      return factory2;

    case 'Biosphere Farm':
      return farm;

    case 'Crystal Synthesizer':
      return synthesizer;

    case 'Platinum Synthesizer':
      return platinumsynthesizer;

    case 'Solar Plant':
      return solar;

    case 'steel':
      return steelIcon;

    case 'gold':
      return goldIcon;

    case 'platinum':
      return platinumIcon;

    case 'crystal':
      return crystalIcon;

    case 'food':
      return foodIcon;

    case 'energy':
      return energyIcon;

    case 'people':
      return peopleIcon;

    case 'spaceship':
      return spaceshipIcon;

    case 'cargo':
      return cargoIcon;

    case 'wave':
      return waveIcon;

    case 'galaxy':
      return galaxyIcon;

    default:
      return fighter;
  }
};
