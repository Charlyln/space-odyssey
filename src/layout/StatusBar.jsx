import React, { useContext, useEffect, useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Stack } from '@mui/material';

import { Context } from '../utils/AppContext';

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

import { socket } from '../utils/socket';

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
    name: 'platinum',
    icon: platinumIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'crystal',
    icon: crystalIcon,
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
    width: 60,
    height: 60,
  },
  {
    name: 'spaceship',
    icon: spaceshipIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'cargoIcon',
    icon: cargoIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'waveIcon',
    icon: waveIcon,
    width: 60,
    height: 60,
  },
  {
    name: 'galaxyIcon',
    icon: galaxyIcon,
    width: 60,
    height: 60,
  },
];

function StatusBar({ menuWidth, infosWidth }) {
  const [ressources, setRessources] = useState([]);

  const getRessourceValue = (ressourceName) => {
    try {
      const ressource = ressources.find((ressource) => ressource.name === ressourceName);
      if (ressource && ressource.value > 0) {
        return ressource.value;
      } else {
        return '-';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function onRessourcesEvent(data) {
      setRessources(data);
    }

    socket.on('ressources', onRessourcesEvent);

    return () => {
      socket.off('ressources', onRessourcesEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction='row' sx={{ width: `calc(100% - ${menuWidth + infosWidth}px)`, ml: `${menuWidth}px`, padding: '5px' }}>
      {ressourceItems.map((ressource, i) => {
        if (!ressource.name) {
          return <div key={i} style={{ width: 60 }}></div>;
        }
        return (
          <div key={ressource.name} style={{ marginLeft: i === 7 ? 'auto' : 'unset', padding: '0px 2px' }}>
            <Card style={{ borderRadius: 0, width: 60, border: 'solid 1px grey' }} variant='outlined'>
              <CardMedia
                sx={{ height: ressource.height, width: ressource.width, margin: 'auto' }}
                image={ressource.icon}
                title={ressource.name}
              />
              <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
                <Typography variant='caption'>{getRessourceValue(ressource.name)}</Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
}

export default StatusBar;
