import React, { useContext } from 'react';

import { Context } from '../utils/AppContext';
import RessourcesStack from '../common/RessourcesStack';
import PageContent from '../common/PageContent';
import PageContainer from '../common/PageContainer';

function Inventory() {
  const { store } = useContext(Context);
  const { user } = store;

  return (
    <PageContainer>
      <PageContent borderLess>
        <RessourcesStack
          size={'70px'}
          ressources={[...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources]}
          disabledCard={true}
          onClick={() => {}}
          square
          footer
        />
      </PageContent>
    </PageContainer>
  );
}

export default Inventory;
