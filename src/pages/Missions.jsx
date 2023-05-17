import React from 'react';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
// import CustomButton from '../common/CustomButton';
// import HeaderAction from '../common/HeaderAction';

function Missions() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} imageName={'missions'} title={'Missions'}>
        {/* <HeaderAction>
          <CustomButton name={'Start a mission'} color={280} width={200} height={50} fontSize={20} />
        </HeaderAction> */}
      </PageHeader>
    </PageContainer>
  );
}

export default Missions;
