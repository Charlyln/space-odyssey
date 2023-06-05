import React from 'react';

import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { getIcon } from '../utils/helpers/icons.helper';
import { formatNumber } from '../utils/helpers/number.helper';

export default function RessourceItem({ onClick, ressource, size, square, disabled, footer, header }) {
  return (
    <div style={{ padding: '2px' }}>
      <Card style={{ width: size, borderRadius: square ? 0 : '4px' }} variant='outlined' onClick={() => onClick && onClick(ressource)}>
        <CardActionArea disabled={disabled}>
          {header && (
            <CardContent style={{ padding: '1px', textAlign: 'center', background: '#3d3d3d' }}>
              <Typography style={{ fontFamily: 'monospace', fontSize: 12 }}>{header}</Typography>
            </CardContent>
          )}
          <CardMedia
            style={{ margin: 'auto', height: size, opacity: ressource.name || ressource.ressource ? 1 : 0.1 }}
            component={ressource.name || ressource.ressource ? 'img' : 'div'}
            image={getIcon(ressource.name || ressource.ressource)}
            alt={ressource.name || ressource.ressource}
          />
          {footer && (
            <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
              <Typography style={{ fontFamily: 'monospace', fontSize: 12, paddingTop: '2px' }}>{formatNumber(ressource?.value)}</Typography>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
}
