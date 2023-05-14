import React from 'react';
import { Card, CardMedia, Typography, Grid, CardContent, AppBar } from '@mui/material';
import steelIcon from '../assets/steel.png';
import goldIcon from '../assets/gold.png';
import peopleIcon from '../assets/people.png';

const ressources = [
  {
    name: 'steel',
    icon: steelIcon,
    value: 1026,
    width: 60,
  },
  {
    name: 'gold',
    icon: goldIcon,
    value: 55,
    width: 60,
  },
  {
    name: 'people',
    icon: peopleIcon,
    value: 126,
    width: 50,
  },
];

function StatusBar({ menuWidth }) {
  return (
    <AppBar position='fixed' sx={{ width: `calc(100% - ${menuWidth}px)`, ml: `${menuWidth}px`, background: 'none', boxShadow: 'none' }}>
      <div style={{ display: 'flex', padding: '5px' }}>
        {ressources.map((ressource) => (
          <Card key={ressource.name} sx={{ width: 80, margin: '2px' }} style={{ borderRadius: 0, border: 'solid 1px turquoise' }}>
            <CardMedia sx={{ height: 45, width: ressource.width, margin: 'auto' }} image={ressource.icon} title={ressource.name} />
            <CardContent style={{ padding: '5px', paddingBottom: '5px', textAlign: 'center' }}>
              <Typography variant='caption'>{ressource.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppBar>
  );
}

export default StatusBar;
