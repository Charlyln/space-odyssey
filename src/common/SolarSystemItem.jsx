import React, { useState } from 'react';
import PageContent from '../common/PageContent';
import SolarSystem from '../common/SolarSystem';

function SolarSystemItem({ planets, sunColor, sunShadowColor, size, sunSize, shadowSize, setdisplayHeader, defaultScale }) {
  const [scale, setScale] = useState(defaultScale || 0.3);
  const [displayOrbit, setDisplayOrbit] = useState(true);
  const [displayName, setDisplayName] = useState(false);

  return (
    <PageContent bgColor={'black'}>
      <SolarSystem
        scale={scale}
        planets={planets}
        sunColor={sunColor}
        sunShadowColor={sunShadowColor}
        size={size}
        sunSize={sunSize}
        shadowSize={shadowSize}
        setScale={setScale}
        displayOrbit={displayOrbit}
        setDisplayOrbit={setDisplayOrbit}
        displayName={displayName}
        setDisplayName={setDisplayName}
        setdisplayHeader={setdisplayHeader}
        defaultScale={defaultScale}
      />
    </PageContent>
  );
}

export default SolarSystemItem;
