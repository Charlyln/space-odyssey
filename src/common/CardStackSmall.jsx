import React from 'react';
import CardItemSmall from './CardItemSmall';

export default function CardStackSmall({ array, cardSize, destroy, cardGetter }) {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {array?.map((element) => (
          <CardItemSmall
            onClick={() => destroy(element)}
            key={element.id}
            imgName={element.name}
            height={cardSize}
            width={cardSize}
            cardGetter={cardGetter}
            item={element}
          />
        ))}
      </div>
    </>
  );
}
