import React from 'react';
import { Chip, Stack } from '@mui/material';

import CustomIcon from './CustomIcon';
import { colors } from '../utils/constants';
import { formatNumber } from '../utils/helpers/number.helper';

export default function RessourceChip({ type, value, ressource }) {
  return (
    <Stack direction='row' spacing={1} alignItems='center' style={{ margin: '5px 2px' }}>
      <Chip
        icon={<CustomIcon size={25} icon={ressource} style={{marginLeft: '4px'}} />}
        label={`${formatNumber(value)} / h`}
        variant='outlined'
        sx={{
          borderColor: type === 'consume' ? colors.red.primary : colors.green.primary,
          width: '130px',
          justifyContent: 'space-between',
        }}
      />
    </Stack>
  );
}
