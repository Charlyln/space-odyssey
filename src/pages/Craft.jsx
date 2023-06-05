import React, { useContext } from 'react';
import { Context } from '../utils/AppContext';
import { Typography, CardContent } from '@mui/material';

import { fomatNumber } from '../utils/helpers/number.helper';
import CardStack from '../common/CardStack';
import PageContent from '../common/PageContent';
import PageContainer from '../common/PageContainer';

const getRessourceValue = (ressourceValue) => {
  try {
    return fomatNumber(ressourceValue);
  } catch (error) {
    console.log(error);
  }
};

function Trade() {
  const { store } = useContext(Context);
  const { user } = store;

  const getFooter = (element) => {
    return (
      <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
        <Typography style={{ fontFamily: 'monospace', fontSize: 12, paddingTop: '2px' }}>{getRessourceValue(element.value)}</Typography>
      </CardContent>
    );
  };

  return (
    <PageContainer>
      <PageContent borderLess>
        <CardStack
          cardSize={'70px'}
          array={[...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources]}
          cardGetter={getFooter}
          disabledCard={true}
          onSelect={() => {}}
          square
          disabled
        />
      </PageContent>
    </PageContainer>
  );
}

export default Trade;
