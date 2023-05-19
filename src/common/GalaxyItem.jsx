import React from 'react';

import { Alert, Card, CardContent, CardMedia, Grid, List, Typography } from '@mui/material';
import { getImg } from '../utils/helper';
import { TransitionGroup } from 'react-transition-group';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import SolarSystemItem from './SolarSystemItem';

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component='svg' sx={{ width: 100, height: 100 }}>
      <Box
        component='polygon'
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points='0,100 50,00, 100,100'
      />
    </Box>
  </Paper>
);
function GalaxyItem({ galaxy, setdisplayHeader, show }) {
  const [systems, setsystems] = React.useState(show ? galaxy.Systems : []);

  const handleChange = () => {
    setsystems((prev) => {
      if (prev.length > 0) {
        return [];
      } else {
        return galaxy.Systems;
      }
    });
  };

  return (
    <Grid item xs={12} style={{ marginBottom: '20px' }}>
      <Card style={{ display: 'flex', height: '200px', position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
        <CardMedia component='img' sx={{ width: '200px' }} image={getImg(galaxy.name)} alt={'position'} />
        <CardContent style={{ width: '100%', padding: '6px 8px' }}>
          <Typography component='div' variant='h5' style={{ fontFamily: 'monospace' }}>
            {galaxy.name}
          </Typography>

          {!show && <FormControlLabel control={<Switch checked={systems.length > 0} onChange={handleChange} />} label='Show' />}
        </CardContent>
      </Card>

      <List>
        <TransitionGroup>
          {systems.map((system) => (
            <Collapse key={system.id}>
              <SolarSystemItem
                planets={system.Planets}
                sunColor={system.sunColor}
                sunShadowColor={system.sunShadow}
                size={system.size}
                sunSize={system.sunSize}
                defaultScale={0.3}
                setdisplayHeader={setdisplayHeader}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Grid>
  );
}

export default GalaxyItem;
