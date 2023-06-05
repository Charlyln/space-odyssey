import React from 'react';
import CardItem from './CardItem';

export default function CardStack({ array, cardSize, onSelect, cardGetter, square, disabled }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {array?.map((spaceship) => (
        <CardItem
          onClick={() => onSelect(spaceship)}
          key={spaceship.name}
          imgName={spaceship.name}
          height={cardSize}
          width={cardSize}
          cardGetter={cardGetter}
          item={spaceship}
          square={square}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
