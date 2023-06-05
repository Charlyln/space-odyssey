import React from 'react';

import PageHeader from '../common/PageHeader';
import storage from '../assets/headers/storage.jpeg';
import PageContainer from '../common/PageContainer';

function Storage() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={storage} imageName={'planet'} title={'Storage'} />
    </PageContainer>
  );
}

export default Storage;
