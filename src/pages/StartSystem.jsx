import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';

import '../common/css/galaxy.css';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';

function Galaxy() {
  const { store } = useContext(Context);
  const { server } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [displayHeader, setdisplayHeader] = useState(true);

  const system = server?.galaxies[0]?.Systems[1];

  return (
    <PageContainer>
      {displayHeader && (
        <PageHeader
          height={'200px'}
          imgWidth={'200px'}
          imageName={'solar_system'}
          title={'Star System'}
          elementSelected={elementSelected}
          setElementSelected={setElementSelected}
        />
      )}

      <SolarSystemItem
        planets={system?.Planets}
        sunColor={system.sunColor}
        sunShadowColor={system.sunShadow}
        size={system.size}
        sunSize={system.sunSize}
        defaultScale={0.3}
        setdisplayHeader={setdisplayHeader}
      />
    </PageContainer>
  );
}

export default Galaxy;
