import { Stack, Typography } from '@mui/material';
import React from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { convertMsToTime } from '../utils/helpers/number.helper';

export default function Duration({ duration, label }) {
  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Typography color='text.secondary' component='div' variant='subtitle2'>
        {label}
      </Typography>
      <AccessTimeFilledIcon />
      <Typography style={{ fontFamily: 'monospace', fontSize: 15 }}>{`${convertMsToTime(duration)}`}</Typography>
    </Stack>
  );
}
