import React from 'react';

import PageHeader from '../common/PageHeader';
import ResearchImg from '../assets/headers/research.jpeg';
import PageContainer from '../common/PageContainer';

function Research() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={ResearchImg} imageName={'Research'} title={'Research'} />
    </PageContainer>
  );
}

export default Research;
