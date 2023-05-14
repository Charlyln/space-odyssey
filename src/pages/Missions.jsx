import React from 'react';
import { Button, Grid } from '@mui/material';

function Missions() {
  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      <Button variant='outlined' >Start a mission</Button>
    </Grid>
  );
}

export default Missions;
