import React, { useContext } from 'react';
import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import SolarSystemItem from '../common/SolarSystemItem';

function Galaxy() {
  const { store } = useContext(Context);
  const { server } = store;

  return (
    <PageContainer>
      {/* <SolarSystemItem planets={planets1} sunColor={'#fae20a'} sunShadowColor={'orange'} size={800} sunSize={200} />
      <SolarSystemItem planets={server.planets} sunColor={'red'} sunShadowColor={'orange'} size={800} sunSize={100} />
      <SolarSystemItem planets={server.planets} sunColor={'#6fcbcd'} sunShadowColor={'#00c7ff'} size={800} sunSize={400} />
      <SolarSystemItem
        planets={planets2}
        sunColor={'black'}
        sunShadowColor={'orange'}
        size={1200}
        sunSize={800}
        defaultScale={0.1}
        shadowSize={30}
        defaultScale={0.3}
      /> */}
    </PageContainer>
  );
}

export default Galaxy;
