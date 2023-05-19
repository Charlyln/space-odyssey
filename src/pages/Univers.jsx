import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import SolarSystemItem from '../common/SolarSystemItem';
import PageContent from '../common/PageContent';
import GalaxyItem from '../common/GalaxyItem';

function Univers() {
  const { store } = useContext(Context);
  const { server } = store;
  const [displayHeader, setdisplayHeader] = useState(true);

  return (
    <PageContainer>
      {server.galaxies.map((galaxy) => (
        <GalaxyItem galaxy={galaxy} setdisplayHeader={setdisplayHeader} />
      ))}
    </PageContainer>
  );
}

export default Univers;
