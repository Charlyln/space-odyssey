import React from 'react';
import { facilitiesStatus } from 'enums';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';

export default function CardItem({ onClick, imgName, height, width, item, cardGetter, square }) {
  const disabled =
    item?.status === facilitiesStatus.setup || item?.status === facilitiesStatus.waiting || item?.status === facilitiesStatus.upgrading;
  return (
    <div style={{ paddingRight: '8px' }}>
      <Card style={{ width, opacity: disabled ? 0.3 : 1, borderRadius: square ? 0 : '4px' }} variant='outlined' onClick={onClick}>
        <CardActionArea disabled={disabled}>
          <CardMedia style={{ margin: 'auto', height, width }} component='img' image={getImg(imgName)} alt={imgName} />
          {cardGetter && cardGetter(item)}
        </CardActionArea>
      </Card>
    </div>
  );
}
