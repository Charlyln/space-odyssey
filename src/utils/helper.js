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
