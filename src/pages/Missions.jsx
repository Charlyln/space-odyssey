import React from 'react';
import { Grid } from '@mui/material';
import CustomButton from '../common/CustomButton';

function Missions() {
  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      <CustomButton name={'Start a mission'} color={280} width={200} height={50} fontSize={20} />
    </Grid>
  );
}

export default Missions;
