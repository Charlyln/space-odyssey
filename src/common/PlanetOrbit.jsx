import React from 'react';

export default function PlanetOrbit({ onClick, size, orbit, speed, name, color }) {
  return (
    <>
      <div className='orbit planet-orbit' style={{ '--orbitsize': `${orbit}px`, '--orbitmargin': `${-orbit / 2}px` }}></div>
      <div
        id={`spin${name}`}
        className='planet-spin'
        style={{ '--orbitsize': `${orbit}px`, '--orbitmargin': `${-orbit / 2}px`, '--speed': `${speed}s` }}
      >
        <div
          className='planet'
          onClick={onClick}
          id={`planet${name}`}
          style={{ '--size': `${size}px`, '--margin': `${-(size / 2)}px`, cursor: 'pointer', '--color': color }}
        ></div>
      </div>
    </>
  );
}
