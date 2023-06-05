import React, { useEffect, useState } from 'react';

export default function LoadingPlanet({ landing }) {
  const [position, setposition] = useState(0);

  useEffect(() => {
    if (landing) {
      const interval = setInterval(() => {
        setposition((prev) => {
          return prev - 1;
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [landing]);

  return (
    <svg viewBox='0 0 160 160' width='160' height='160' className='App-logo' style={{ position: 'absolute', top: position, right: -85 }}>
      <circle cx='80' cy='80' r='50' fill='#1edada' />
      <g transform=' matrix(0.866, -0.5, 0.25, 0.433, 80, 80)'>
        <path d='M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z' fill='grey'>
          <animateTransform attributeName='transform' type='rotate' from='360 0 0' to='0 0 0' dur='1s' repeatCount='indefinite' />
        </path>
      </g>
      <path d='M 50,0 A 50,50 0 0,0 -50,0Z' transform='matrix(0.866, -0.5, 0.5, 0.866, 80, 80)' fill='#1edada' />
    </svg>
  );
}
