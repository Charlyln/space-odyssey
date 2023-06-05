import React, { useEffect, useState } from 'react';
import CustomIcon from './CustomIcon';

export default function LandingSpaceShip({ landing, setredirect }) {
  const [position, setposition] = useState(550);

  useEffect(() => {
    if (landing) {
      const interval = setInterval(() => {
        setposition((prev) => {
          if (prev > 500) {
            return prev - 1;
          } else if (prev > 400) {
            return prev - 2;
          } else if (prev > 300) {
            return prev - 3;
          } else {
            clearInterval(interval);
            setredirect(true);
            return prev - 1;
          }
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [landing]);

  return (
    <CustomIcon
      size={30}
      icon={'spaceship'}
      style={{ transform: 'rotate(180deg)', position: 'absolute', top: position, right: -20, opacity: landing ? 1 : 0 }}
    />
  );
}
