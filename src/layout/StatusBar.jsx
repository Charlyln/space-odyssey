import React, { useContext } from 'react';
import { Card, CardMedia, Typography, CardContent, AppBar, Stack, Grid, Divider } from '@mui/material';

import { Context } from '../utils/AppContext';

import steelIcon from '../assets/steel.png';
import goldIcon from '../assets/gold.png';
import peopleIcon from '../assets/people.png';
import spaceshipIcon from '../assets/spaceship.png';
import plutoniumIcon from '../assets/plutonium.png';
import energyIcon from '../assets/energy.png';
import foodIcon from '../assets/food.png';

const ressourceItems = [
  {
    name: 'steel',
    icon: steelIcon,
    width: 60,
    height: 45,
  },
  {
    name: 'gold',
    icon: goldIcon,
    width: 60,
    height: 45,
  },
  {
    name: 'plutonium',
    icon: plutoniumIcon,
    width: 45,
    height: 45,
  },
  {},
  {
    name: 'energy',
    icon: energyIcon,
    width: 40,
    height: 45,
  },
  {
    name: 'food',
    icon: foodIcon,
    width: 45,
    height: 45,
  },
  {},
  {},
  {},
  {},
  {
    name: 'people',
    icon: peopleIcon,
    width: 50,
    height: 45,
  },
  {
    name: 'spaceship',
    icon: spaceshipIcon,
    width: 50,
    height: 45,
  },
];

function StatusBar({ menuWidth, infosWidth }) {
  const {
    store: { ressources },
  } = useContext(Context);

  const getRessourceValue = (ressourceName) => {
    try {
      const ressource = ressources.find((ressource) => ressource.name === ressourceName);
      return ressource.value;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ width: `calc(100% - ${menuWidth + infosWidth}px)`, ml: `${menuWidth}px`, padding: '5px' }}>
      {ressourceItems.map((ressource, i) => {
        if (!ressource.name) {
          return <Grid item xs={1}></Grid>;
        }
        return (
          <Grid item xs={1} key={ressource.name}>
            <Card sx={{ margin: '2px' }} style={{ borderRadius: 0, border: 'solid 1px turquoise' }}>
              <CardMedia
                sx={{ height: ressource.height, width: ressource.width, margin: 'auto' }}
                image={ressource.icon}
                title={ressource.name}
              />
              <CardContent style={{ padding: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                <Typography variant='caption'>{getRessourceValue(ressource.name)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default StatusBar;
