import React from 'react';

import PageHeader from '../common/PageHeader';
import HistoryImg from '../assets/headers/history.jpeg';
import PageContainer from '../common/PageContainer';

function History() {
  return (
    <PageContainer>
      <PageHeader height={'250px'} imgWidth={'400px'} image={HistoryImg} imageName={'History'} title={'History'} />
    </PageContainer>
  );
}

export default History;
