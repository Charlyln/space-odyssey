import React from 'react';

export default function PlanetOrbit({ planet, name, scale, selectedItem }) {
  const { size, orbit, speed, color } = planet;

  console.log(selectedItem?.size, planet?.size);

  return (
    <>
      <div
        className='orbit planet-orbit'
        style={{
          width: `${orbit * scale}px`,
          height: `${orbit * scale}px`,
          marginTop: `${-(orbit * scale) / 2}px`,
          marginLeft: `${-(orbit * scale) / 2}px`,
        }}
      />
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
          className='planet'
          id={`planet${name}`}
          style={{
            width: `${size * scale}px`,
            height: `${size * scale}px`,
            marginTop: `${-((size * scale) / 2)}px`,
            marginLeft: `${-((size * scale) / 2)}px`,
            backgroundColor: `${color}`,
            boxShadow: `0 0 ${4}px ${color}`,
            border: selectedItem?.size === planet?.size ? 'solid 2px red' : 'none',
          }}
        />
      </div>
    </>
  );
}
