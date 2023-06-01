import fighter from '../../assets/spaceships/fighter.jpeg';
import cruiser from '../../assets/spaceships/cruiser.jpeg';
import battleShip from '../../assets/spaceships/battleship.jpeg';
import bomber from '../../assets/spaceships/bomber.jpeg';
import cargo from '../../assets/spaceships/cargo.jpeg';
import crawler from '../../assets/spaceships/crawler.jpeg';
import steelmine from '../../assets/facilities/steelmine.jpeg';
import goldmine from '../../assets/facilities/goldmine.jpeg';
import biospherefarm from '../../assets/facilities/biospherefarm.jpeg';
import solarplant from '../../assets/facilities/solarplant.jpeg';
import crystalsynthesizer from '../../assets/facilities/steelmine.jpeg';
import platinumsynthesizer from '../../assets/facilities/goldmine.jpeg';
import defence from '../../assets/headers/defence.jpeg';
import shipyard from '../../assets/headers/shipyard.jpeg';
import ressources from '../../assets/headers/ressources.jpeg';
import missions from '../../assets/headers/missions.jpeg';
import history from '../../assets/headers/history.jpeg';
import trade from '../../assets/headers/trade.jpeg';
import galaxy from '../../assets/headers/galaxy.jpeg';
import planet from '../../assets/headers/planet.jpeg';
import research from '../../assets/headers/research.jpeg';
import facilities from '../../assets/headers/facilities.jpeg';
import storage from '../../assets/headers/storage.jpeg';
import overview from '../../assets/headers/overview.jpeg';
import colony from '../../assets/headers/colony.jpeg';
import solar_system from '../../assets/headers/solar_system.jpeg';
import univers from '../../assets/headers/univers.jpeg';
import JKCS_041 from '../../assets/planets/JKCS-041.jpeg';
import SPT0346_52 from '../../assets/planets/SPT0346-52.jpeg';
import A1689_zD1 from '../../assets/planets/A1689-zD1.jpeg';
import colonyscientist from '../../assets/colony/colonyfood.jpeg';
import colonyressource from '../../assets/colony/colonyressource.jpeg';
import colonyexplorer from '../../assets/colony/colonyexplorer2.jpeg';
import colonyfood from '../../assets/colony/colonyscientist.jpeg';
import colonysoldier from '../../assets/colony/colonysoldier.jpeg';
import andromeda from '../../assets/galaxies/andromeda.jpeg';
import milyway from '../../assets/galaxies/milyway.jpeg';

export const getImg = (name) => {
  switch (name) {
    case 'Andromeda':
      return andromeda;

    case 'Milky Way':
      return milyway;

    case 'univers':
      return univers;

    case 'solar_system':
      return solar_system;

    case 'colonysoldier':
      return colonysoldier;

    case 'colonyfood':
      return colonyfood;

    case 'colonyressource':
      return colonyressource;

    case 'colonyexplorer':
      return colonyexplorer;

    case 'colonyscientist':
      return colonyscientist;

    case 'JKCS-041':
      return JKCS_041;

    case 'SPT0346-52':
      return SPT0346_52;

    case 'A1689-zD1':
      return A1689_zD1;

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

    case 'colony':
      return colony;

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
      return steelmine;

    case 'Gold Mine':
      return goldmine;

    case 'Biosphere Farm':
      return biospherefarm;

    case 'Crystal Synthesizer':
      return crystalsynthesizer;

    case 'Platinum Synthesizer':
      return platinumsynthesizer;

    case 'Solar Plant':
      return solarplant;

    default:
      return fighter;
  }
};
