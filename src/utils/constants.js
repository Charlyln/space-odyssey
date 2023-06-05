const spaceships = [
  {
    name: 'Fighter',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 10,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Cruiser',
    type: 'attack',
    capacity: 10,
    transport: 10,
    attack: 20,
    defense: 10,
    speed: 10,
  },
  {
    name: 'BattleShip',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 50,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Bomber',
    type: 'attack',
    capacity: 5,
    transport: 5,
    attack: 100,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Cargo',
    type: 'transport',
    capacity: 5,
    transport: 5,
    attack: 110,
    defense: 10,
    speed: 10,
  },
  {
    name: 'Crawler',
    type: 'transport',
    capacity: 5,
    transport: 5,
    attack: 120,
    defense: 10,
    speed: 10,
  },
];

const colors = {
  green: {
    primary: '#81c784',
    secondary: '#406441',
  },
  red: {
    primary: '#b34545',
    secondary: '#721d1d',
  },
  lightGrey: {
    primary: '#4b5d5d',
    secondary: '#1edada',
  },
  darkGrey: {
    primary: '#282828',
    secondary: '#1edada',
  },
  blue: {
    primary: '#108080',
  },
};

const containerStyles = {
  overflow: 'auto',
  backgroundColor: 'transparent',
  '&::-webkit-scrollbar': {
    width: 5,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
    backgroundColor: '#555',
  },
};

module.exports = {
  spaceships,
  colors,
  containerStyles,
};
