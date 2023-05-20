import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getIcon } from '../utils/helpers/icons.helper';
import { fomatNumber } from '../utils/helpers/number.helper';

export default function RessourceItem({ onClick, ressource, size, square, disabled, footer }) {
  return (
    <div style={{ padding: '2px' }}>
      <Card style={{ width: size, borderRadius: square ? 0 : '4px' }} variant='outlined' onClick={onClick}>
        <CardMedia style={{ margin: 'auto', height: size }} component='img' image={getIcon(ressource.name)} alt={ressource.name} />
        {footer && (
          <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
            <Typography style={{ fontFamily: 'monospace', fontSize: 12, paddingTop: '2px' }}>{fomatNumber(ressource.value)}</Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
