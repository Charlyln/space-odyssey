import React from 'react';

import { Card, CardMedia, CardActionArea } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';

export default function CardItem({ onClick, imgName, height, width, item, cardGetter, square, disabled }) {
  return (
    <div style={{ paddingRight: '8px' }}>
      <Card style={{ width, opacity: item.upgrading ? 0.3 : 1, borderRadius: square ? 0 : '4px' }} variant='outlined' onClick={onClick}>
        {disabled ? (
          <>
            <CardMedia style={{ margin: 'auto', height, width }} component='img' image={getImg(imgName)} alt={imgName} />
            {cardGetter && cardGetter(item)}{' '}
          </>
        ) : (
          <CardActionArea>
            <CardMedia style={{ margin: 'auto', height, width }} component='img' image={getImg(imgName)} alt={imgName} />
            {cardGetter && cardGetter(item)}
          </CardActionArea>
        )}
      </Card>
    </div>
  );
}
