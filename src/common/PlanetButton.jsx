import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

export default function PlanetButton({ planet, name, scale, selectItem, selectedItem }) {
  const { size, color } = planet;

  return (
    <Tooltip title={planet.name}>
      <IconButton selected onClick={() => selectItem(planet)}>
        <div
          className='planet'
          id={`planet${name}`}
          style={{
            width: `${size * scale}px`,
            height: `${size * scale}px`,
            backgroundColor: `${color}`,
            boxShadow: `0 0 ${5}px ${color}`,
            borderRadius: '50%',
            position: 'relative',
          }}
        >
          <div
            className='planetBorder'
            style={{
              width: `${size * scale + 10}px`,
              height: `${size * scale + 10}px`,
              border: selectedItem?.id === planet?.id ? 'dotted' : 'none',
              animation: `spin-right 5s infinite linear`,
              borderRadius: '50%',
              position: 'absolute',
              top: '-5px',
              right: '-5px',
            }}
          />
        </div>
      </IconButton>
    </Tooltip>
  );
}
