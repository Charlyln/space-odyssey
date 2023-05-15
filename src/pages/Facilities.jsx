import React from 'react';

import PageHeader from '../common/PageHeader';
import FacilitiesImg from '../assets/headers/facilities.jpeg';
import PageContainer from '../common/PageContainer';

function Facilities() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={FacilitiesImg} imageName={'Facilities'} title={'Facilities'} />
    </PageContainer>
  );
}

export default Facilities;
