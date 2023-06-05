import React, { useContext } from 'react';
import { Card, CardMedia, Typography, CardContent, AppBar } from '@mui/material';

import { Context } from '../utils/AppContext';

import steelIcon from '../assets/steel.png';
import goldIcon from '../assets/gold.png';
import peopleIcon from '../assets/people.png';

const ressourceItems = [
  {
    name: 'steel',
    icon: steelIcon,
    width: 60,
  },
  {
    name: 'gold',
    icon: goldIcon,
    width: 60,
  },
  {
    name: 'people',
    icon: peopleIcon,
    width: 50,
  },
];

function StatusBar({ menuWidth }) {
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
    <AppBar position='fixed' sx={{ width: `calc(100% - ${menuWidth}px)`, ml: `${menuWidth}px`, background: 'none', boxShadow: 'none' }}>
      <div style={{ display: 'flex', padding: '5px' }}>
        {ressourceItems.map((ressource) => (
          <Card key={ressource.name} sx={{ width: 80, margin: '2px' }} style={{ borderRadius: 0, border: 'solid 1px turquoise' }}>
            <CardMedia sx={{ height: 45, width: ressource.width, margin: 'auto' }} image={ressource.icon} title={ressource.name} />
            <CardContent style={{ padding: '5px', paddingBottom: '5px', textAlign: 'center' }}>
              <Typography variant='caption'>{getRessourceValue(ressource.name)}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppBar>
  );
}

export default StatusBar;
