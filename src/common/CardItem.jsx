import React from 'react';

import { Card, CardMedia, CardActionArea } from '@mui/material';
import { getImg } from '../utils/helper';

export default function CardItem({ onClick, imgName, height, width, item, cardGetter }) {
  return (
    <div style={{ paddingRight: '10px' }}>
      <Card style={{ width, marginTop: '10px', opacity: item.upgrading ? 0.3 : 1 }} variant='outlined' onClick={onClick}>
        <CardActionArea>
          <CardMedia style={{ margin: 'auto', height, width }} component='img' image={getImg(imgName)} alt={imgName} />
          {cardGetter && cardGetter(item)}
        </CardActionArea>
      </Card>
    </div>
  );
}
