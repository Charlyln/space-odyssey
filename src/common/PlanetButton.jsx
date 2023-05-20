import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { getIcon } from '../utils/helpers/icons.helper';
import CustomIcon from './CustomIcon';

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
          {isBasePlanet && <CustomIcon size={25} icon={'basePlanet'} style={{ position: 'absolute', top: '8px', right: '-8px' }} />}
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
