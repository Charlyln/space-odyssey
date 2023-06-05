import React from 'react';

import PageHeader from '../common/PageHeader';
import DefenceImg from '../assets/headers/defence.jpeg';
import PageContainer from '../common/PageContainer';

function Defence() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={DefenceImg} imageName={'Defence'} title={'Defence'} />
    </PageContainer>
  );
}

export default Defence;
