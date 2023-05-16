import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Stack } from '@mui/material';

import { socket } from '../utils/socket';
import { getImg } from '../utils/helper';

const ressourceItems = [
  {
    name: 'steel',
    width: 60,
    height: 60,
  },
  {
    name: 'gold',
    width: 60,
    height: 60,
  },
  {
    name: 'platinum',
    width: 60,
    height: 60,
  },
  {
    name: 'crystal',
    width: 60,
    height: 60,
  },
  {},
  {
    name: 'energy',
    width: 60,
    height: 60,
  },
  {
    name: 'food',
    width: 60,
    height: 60,
  },
  {
    name: 'people',
    width: 60,
    height: 60,
  },
  {
    name: 'spaceship',
    width: 60,
    height: 60,
  },
  {
    name: 'cargo',
    width: 60,
    height: 60,
  },
  {
    name: 'wave',
    width: 60,
    height: 60,
  },
  {
    name: 'galaxyicon',
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
                image={getImg(ressource.name)}
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
