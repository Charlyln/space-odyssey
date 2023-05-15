import React, { useContext } from 'react';
import { Card, CardMedia, Typography, CardContent, Stack } from '@mui/material';

import { Context } from '../utils/AppContext';

import steelIcon from '../assets/ressources/steel.png';
import goldIcon from '../assets/ressources/gold.png';
import peopleIcon from '../assets/ressources/people.png';
import spaceshipIcon from '../assets/ressources/spaceship.png';
import CrystalIcon from '../assets/ressources/crystal.png';
import energyIcon from '../assets/ressources/energy.png';
import foodIcon from '../assets/ressources/food.png';

const ressourceItems = [
  {
    name: 'steel',
    icon: steelIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'gold',
    icon: goldIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'crystal',
    icon: CrystalIcon,
    width: 60,
    height: 60,
  },
  {},
  {
    name: 'energy',
    icon: energyIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'food',
    icon: foodIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'people',
    icon: peopleIcon,
    width: 45,
    height: 45,
  },
  // {
  //   name: 'spaceship',
  //   icon: spaceshipIcon,
  //   width: 45,
  //   height: 45,
  // },
];

function StatusBar({ menuWidth, infosWidth }) {
  const {
    store: { user },
  } = useContext(Context);

  const getRessourceValue = (ressourceName) => {
    try {
      const ressource = user.Ressources.find((ressource) => ressource.name === ressourceName);
      return ressource.value;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Grid container sx={{ width: `calc(100% - ${menuWidth + infosWidth}px)`, ml: `${menuWidth}px`, padding: '5px' }}>
    <Stack direction='row' sx={{ width: `calc(100% - ${menuWidth + infosWidth}px)`, ml: `${menuWidth}px`, padding: '5px' }}>
      {ressourceItems.map((ressource, i) => {
        if (!ressource.name) {
          return <div key={i} style={{ width: 60 }}></div>;
        }
        return (
          <Card
            sx={{ margin: '2px', marginLeft: i === 6 ? 'auto' : 'unset' }}
            style={{ borderRadius: 0, width: 60 }}
            variant='outlined'
            key={ressource.name}
          >
            <CardMedia
              sx={{ height: ressource.height, width: ressource.width, margin: 'auto', marginTop: i > 5 ? '10px' : 'unset' }}
              image={ressource.icon}
              title={ressource.name}
            />
            <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
              <Typography variant='caption'>{getRessourceValue(ressource.name)}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
    // </Grid>
  );
}

export default StatusBar;
