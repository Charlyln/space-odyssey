import { Button } from '@mui/material';
import React, { useState } from 'react';
import PageContent from '../common/PageContent';
import SolarSystem from '../common/SolarSystem';

function SolarSystemItem({ planets, sunColor, sunShadowColor, size, sunSize, defaultScale }) {
  const [scale, setScale] = useState(0.2);

  const handleChange = () => {
    setScale(0.8);
  };

  const handleClose = () => {
    setScale(0.2);
  };

  const planetss = [
    {
      name: 'Alf Cen B b',
      temperature: 23,
      danger: 'medium',
      size: 25,
      orbit: 250,
      speed: 30,
      color: '#9f4e17',
    },
    {
      name: 'HIP 70890 c',
      temperature: 37,
      danger: 1,
      size: 40,
      orbit: 500,
      speed: 40,
      color: '#4c4c77',
    },
    {
      name: 'HD 128621 c',
      temperature: -12,
      danger: 'low',
      size: 55,
      orbit: 380,
      speed: 20,
      color: 'grey',
    },
  ];

  return (
    <PageContent>
      <Button onClick={handleChange}>open</Button>
      <Button onClick={handleClose}>close</Button>
      <SolarSystem scale={scale} planets={planetss} sunColor={sunColor} sunShadowColor={sunShadowColor} size={size} sunSize={sunSize} />
    </PageContent>
  );
}

export default SolarSystemItem;
