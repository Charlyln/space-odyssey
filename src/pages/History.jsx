import React from 'react';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import InfosList from '../common/InfosList';

function History() {
  return (
    <PageContainer>
      <PageHeader height={'250px'} imgWidth={'400px'} imageName={'history'} title={'History'} />
      <PageContent>
        <InfosList height={'calc(100vh - 390px)'} />
      </PageContent>
    </PageContainer>
  );
}

export default History;
