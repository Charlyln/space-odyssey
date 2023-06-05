import React from 'react';
import { Chip, Stack, Typography } from '@mui/material';

import CustomIcon from './CustomIcon';
import { colors } from '../utils/constants';

export default function RessourceChip({ type, value, ressource }) {
  return (
    <Stack direction='row' spacing={1} alignItems='center' style={{ margin: '5px 2px' }}>
      {/* <Typography color='text.secondary' component='div' variant='subtitle2' style={{ width: '100px' }}>
        {type}
      </Typography> */}
      <Chip
        icon={<CustomIcon size={30} icon={ressource} />}
        label={`${value} / h`}
        variant='outlined'
        style={{ borderColor: type === 'consume' ? colors.red.primary : colors.green.primary }}
      />
    </Stack>
  );
}
