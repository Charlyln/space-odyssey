import React, { useState } from 'react';
import PageContent from './PageContent';
import SolarSystem from './SolarSystem';

function SolarSystemItem({
  planets,
  sunColor,
  sunShadowColor,
  size,
  sunSize,
  shadowSize,
  setdisplayHeader,
  defaultScale,
  setElementSelected,
  elementSelected,
  disableButtons,
  basePlanet,
  height
}) {
  const [scale, setScale] = useState(defaultScale || 0.3);
  const [displayOrbit, setDisplayOrbit] = useState(false);
  const [displayName, setDisplayName] = useState(false);

  return (
    <PageContent bgColor={'black'} height={height}>
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
        setElementSelected={setElementSelected}
        elementSelected={elementSelected}
        disableButtons={disableButtons}
        basePlanet={basePlanet}
      />
    </PageContent>
  );
}

export default SolarSystemItem;
