import { Typography } from '@mui/material';
import React from 'react';
import CustomIcon from './CustomIcon';

export default function PlanetOrbit({ planet, name, scale, selectedItem, displayOrbit, displayName, basePlanet }) {
  const { size, orbit, speed, color } = planet;
  const isBasePlanet = basePlanet.id === planet.id;

  return (
    <>
      <div
        className='orbit planet-orbit'
        style={{
          width: `${orbit * scale}px`,
          height: `${orbit * scale}px`,
          marginTop: `${-(orbit * scale) / 2}px`,
          marginLeft: `${-(orbit * scale) / 2}px`,
          border: displayOrbit ? '1px dashed #666' : '',
        }}
      />

      {displayName && (
        <Typography
          className='orbit planet-orbit'
          style={{
            marginTop: `${-(orbit * scale - orbit / 8) / 2}px`,
            marginLeft: `${-(orbit * scale - orbit / 8) / 2}px`,
            fontFamily: 'monospace',
          }}
          variant='subtitle2'
          color='text.secondary'
          component='div'
        >
          {planet.name}
        </Typography>
      )}

      <div
        id={`spin${name}`}
        className='planet-spin'
        style={{
          width: `${orbit * scale}px`,
          height: `${orbit * scale}px`,
          marginTop: `${-(orbit * scale) / 2}px`,
          marginLeft: `${-(orbit * scale) / 2}px`,
          animation: `spin-right ${speed}s infinite linear`,
        }}
      >
        <div
          className='planetBorder'
          style={{
            width: `${size * scale + 10}px`,
            height: `${size * scale + 10}px`,
            marginTop: `${-((size * scale + 10) / 2)}px`,
            marginLeft: `${-((size * scale + 10) / 2)}px`,
            border: selectedItem?.id === planet?.id ? 'dotted' : 'none',
            animation: `spin-right 5s infinite linear`,
          }}
        />
        <div
          className='planet'
          id={`planet${name}`}
          style={{
            width: `${size * scale}px`,
            height: `${size * scale}px`,
            marginTop: `${-((size * scale) / 2)}px`,
            marginLeft: `${-((size * scale) / 2)}px`,
            backgroundColor: `${color}`,
            boxShadow: `0 0 ${5}px ${color}`,
            positon: 'relative',
          }}
        >
          {isBasePlanet && <CustomIcon size={25} icon={'basePlanet'} style={{ position: 'absolute', top: '-25px', right: '-10px' }} />}
        </div>
      </div>
    </>
  );
}
