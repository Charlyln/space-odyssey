import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function ColonistItem({ colonist, assigments }) {
  return (
    <Stack direction='row' spacing={1}>
      <Typography style={{ width: '20%' }}>{colonist.name}</Typography>
      <Typography style={{ width: '10%' }}>{colonist.age}</Typography>
    </Stack>
  );
}
