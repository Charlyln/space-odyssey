import React from 'react';

import PageHeader from '../common/PageHeader';
import PlanetImg from '../assets/headers/planet.jpeg';
import PageContainer from '../common/PageContainer';

function Planet() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={PlanetImg} imageName={'Planet'} title={'Planet'} />
    </PageContainer>
  );
}

export default Planet;
