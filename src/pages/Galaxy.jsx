import React from 'react';

import PageHeader from '../common/PageHeader';
import GalaxyImg from '../assets/headers/galaxy.jpeg';
import PageContainer from '../common/PageContainer';

function Galaxy() {
  return (
    <PageContainer>
      <PageHeader height={'450px'} imgWidth={'400px'} image={GalaxyImg} imageName={'Galaxy'} title={'Galaxy'} />
    </PageContainer>
  );
}

export default Galaxy;
