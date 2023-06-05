import { Button } from '@mui/material';
import React, { useState } from 'react';
import PageContent from '../common/PageContent';
import SolarSystem from '../common/SolarSystem';

function SolarSystemItem({ planets, sunColor, sunShadowColor, size, sunSize, shadowSize, defaultScale }) {
  const [scale, setScale] = useState(defaultScale || 0.3);

  // const handleChange = () => {
  //   setScale(0.8);
  // };

  // const handleClose = () => {
  //   setScale(0.2);
  // };

  return (
    <PageContent bgColor={'black'}>
      {/* <Button onClick={handleChange}>open</Button>
      <Button onClick={handleClose}>close</Button> */}
      <SolarSystem
        scale={scale}
        planets={planets}
        sunColor={sunColor}
        sunShadowColor={sunShadowColor}
        size={size}
        sunSize={sunSize}
        shadowSize={shadowSize}
        setScale={setScale}
      />
    </PageContent>
  );
}

export default SolarSystemItem;
