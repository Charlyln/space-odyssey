import React from 'react';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import InfosList from '../common/InfosList';

const header = '150px';
const body = `calc(100vh - (110px + ${header}))`;

function History() {
  return (
    <PageContainer>
      <PageHeader height={header} imgWidth={'400px'} imageName={'history'} title={'History'} />
      <PageContent height={body}>
        <InfosList height={body} />
      </PageContent>
    </PageContainer>
  );
}

export default History;
