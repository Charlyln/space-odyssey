// Ressources

import steel from '../../assets/icons/ressources/steel.webp';
import gold from '../../assets/icons/ressources/gold.webp';
import platinum from '../../assets/icons/ressources/platinum2.webp';
import crystal from '../../assets/icons/ressources/crystal.webp';
import energy from '../../assets/icons/ressources/energy.webp';
import food from '../../assets/icons/ressources/food.webp';
import money from '../../assets/icons/ressources/money.webp';
import people from '../../assets/icons/ressources/people.webp';
import spaceship from '../../assets/icons/ressources/spaceship.webp';
import cargo from '../../assets/icons/ressources/cargo.webp';
import galaxy from '../../assets/icons/ressources/galaxy.webp';
import wave from '../../assets/icons/ressources/wave.webp';
import antimatter from '../../assets/icons/ressources/antimatter.webp';

// Products

import amhousing from '../../assets/icons/products/amhousing.webp';
import warpcell from '../../assets/icons/products/warpcell.webp';

// Missions

import mission from '../../assets/icons/missions/mission.webp';
import combat from '../../assets/icons/missions/combat.webp';
import exploration from '../../assets/icons/missions/exploration.webp';
import industrial from '../../assets/icons/missions/industrial.webp';
import level from '../../assets/icons/missions/level.webp';
import trade from '../../assets/icons/missions/trade.webp';
import basePlanet from '../../assets/icons/missions/basePlanet2.webp';

export const getIcon = (name) => {
  switch (name) {
    case 'amhousing':
      return amhousing;

    case 'warpcell':
      return warpcell;

    case 'antimatter':
      return antimatter;

    case 'basePlanet':
      return basePlanet;

    case 'mission':
      return mission;

    case 'combat':
      return combat;

    case 'exploration':
      return exploration;

    case 'industrial':
      return industrial;

    case 'level':
      return level;

    case 'trade':
      return trade;

    case 'steel':
      return steel;

    case 'gold':
      return gold;

    case 'platinum':
      return platinum;

    case 'crystal':
      return crystal;

    case 'food':
      return food;

    case 'energy':
      return energy;

    case 'money':
      return money;

    case 'people':
      return people;

    case 'spaceship':
      return spaceship;

    case 'cargo':
      return cargo;

    case 'wave':
      return wave;

    case 'galaxyicon':
      return galaxy;

    default:
      return mission;
  }
};
