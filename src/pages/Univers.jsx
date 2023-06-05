import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import SolarSystemItem from '../common/SolarSystemItem';
import PageContent from '../common/PageContent';
import GalaxyItem from '../common/GalaxyItem';

function Univers() {
  const { store } = useContext(Context);
  const { user, server } = store;
  const [displayHeader, setdisplayHeader] = useState(true);

  return (
    <PageContainer>
      {server.galaxies.map((galaxy) => (
        <GalaxyItem key={galaxy.id} galaxy={galaxy} setdisplayHeader={setdisplayHeader} user={user} />
      ))}
    </PageContainer>
  );
}

export default Univers;
