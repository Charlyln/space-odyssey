import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import GalaxyItem from '../common/GalaxyItem';

function Galaxy() {
  const { store } = useContext(Context);
  const { user, server } = store;
  const [displayHeader, setdisplayHeader] = useState(true);

  return (
    <PageContainer>
      <GalaxyItem show galaxy={server.galaxies[0]} setdisplayHeader={setdisplayHeader} user={user} />
    </PageContainer>
  );
}

export default Galaxy;
