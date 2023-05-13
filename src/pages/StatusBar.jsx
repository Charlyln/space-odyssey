import React from 'react';
import { Card, CardMedia, Typography, Grid, CardContent } from '@mui/material';
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

function StatusBar() {
  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      {ressources.map((ressource) => (
        <Grid item xs={1} key={ressource.name}>
          <Card sx={{ width: 80 }} style={{ borderRadius: 0, border: 'solid 1px turquoise' }}>
            <CardMedia sx={{ height: 45, width: ressource.width, margin: 'auto' }} image={ressource.icon} title={ressource.name} />
            <CardContent style={{ padding: '5px', paddingBottom: '5px', textAlign: 'center' }}>
              <Typography variant='caption'>{ressource.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatusBar;
