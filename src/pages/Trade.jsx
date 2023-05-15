import React from 'react';

import PageHeader from '../common/PageHeader';
import TradeImg from '../assets/headers/trade.jpeg';
import PageContainer from '../common/PageContainer';

function Trade() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} image={TradeImg} imageName={'Trade'} title={'Trade'} />
    </PageContainer>
  );
}

export default Trade;
