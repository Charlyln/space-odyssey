import React from 'react';
import { Grid } from '@mui/material';
import CustomButton from '../common/CustomButton';

function Missions() {
  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      <CustomButton name={'Start a mission'} color={280} />
    </Grid>
  );
}

export default Missions;
