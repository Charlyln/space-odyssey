import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Stack } from '@mui/material';

import { socket } from '../utils/socket';
import { getIcon } from '../utils/helpers/icons.helper';
import { formatNumber } from '../utils/helpers/number.helper';

const ressourceItems = [
  { name: 'money', iconWidth: 120, width: 140 },
  {
    name: 'steel',
  },
  {
    name: 'gold',
  },
  {
    name: 'platinum',
  },
  {
    name: 'crystal',
  },
  {},
  {
    name: 'energy',
  },
  {
    name: 'food',
  },
  {},
  {
    name: 'colonists',
  },
  {
    name: 'spaceship',
  },
  {
    name: 'cargo',
  },
  {
    name: 'wave',
  },
  {
    name: 'galaxyicon',
  },
];

function StatusBar({ menuWidth, infosWidth }) {
  const [ressources, setRessources] = useState([]);

  const getRessourceValue = (ressourceName) => {
    try {
      const ressource = ressources.find((ressource) => ressource.name === ressourceName);
      if (ressource) {
        return formatNumber(ressource.value);
      } else {
        return '-';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function onRessourcesEvent(data) {
      setRessources(data.ressources);
    }

    socket.on('ressources', onRessourcesEvent);

    return () => {
      socket.off('ressources', onRessourcesEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(ressources);

  return (
    <Stack direction='row' sx={{ width: `calc(100% - ${menuWidth + infosWidth}px)`, ml: `${menuWidth}px`, padding: '5px' }}>
      {ressourceItems.map((ressource, i) => {
        if (!ressource.name) {
          return <div key={i} style={{ width: 60 }}></div>;
        }

        return (
          <div key={ressource.name} style={{ marginLeft: i === 9 ? 'auto' : 'unset', padding: '0px 2px' }}>
            <Card
              style={{ borderRadius: 0, width: ressource.width || 60, border: 'solid 1px grey', background: 'none' }}
              variant='outlined'
            >
              <CardMedia
                sx={{ height: 60, width: ressource.iconWidth || 60, margin: 'auto' }}
                image={getIcon(ressource.name)}
                title={ressource.name}
              />
              <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
                <Typography style={{ fontFamily: 'monospace', fontSize: 12, paddingTop: '2px' }}>
                  {getRessourceValue(ressource.name)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
}

export default StatusBar;
