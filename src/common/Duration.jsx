import { Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { convertMsToTime } from '../utils/helpers/number.helper';

export default function Duration({ duration, label, size }) {
  return (
    <Chip
      icon={<AccessTimeFilledIcon />}
      style={{ fontFamily: 'monospace', fontSize: 12 }}
      label={`${convertMsToTime(duration)}`}
      variant='outlined'
      size={size}
    />
  );
}
