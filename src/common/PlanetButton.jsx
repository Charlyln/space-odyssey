import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { getIcon } from '../utils/helper';

export default function PlanetButton({ planet, name, scale, selectItem, selectedItem, basePlanet }) {
  const { size, color } = planet;
  const isBasePlanet = basePlanet.id === planet.id;

  return (
    <Tooltip title={planet.name}>
      <IconButton onClick={() => selectItem(planet)}>
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
          {isBasePlanet && (
            <img
              style={{ width: '30px', height: '30px', position: 'absolute', top: '8px', right: '-10px' }}
              src={getIcon('basePlanet')}
              alt={'basePlanet'}
            />
          )}
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
