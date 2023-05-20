import React from 'react';

import { Card, CardMedia } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';
import CardProgress from './CardProgress';

export default function CardItemSmall({ imgName, width, item, cardGetter }) {
  return (
    <div style={{ paddingRight: '10px' }}>
      <Card style={{ width, marginTop: '10px', position: 'relative' }} variant='outlined'>
        <CardMedia style={{ margin: 'auto', height: width, width }} component='img' image={getImg(item.name)} alt={imgName} />
        {cardGetter && cardGetter(item)}
        <CardProgress variant='determinate' progress={item?.State?.progress} height={10} />
      </Card>
    </div>
  );
}
