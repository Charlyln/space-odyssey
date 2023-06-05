import React from 'react';

import PageContainer from '../common/PageContainer';
import PageHeader from '../common/PageHeader';
import PageContent from '../common/PageContent';
import CardItem from '../common/CardItem';
import CardStack from '../common/CardStack';

const jobs = [
  {
    name: 'colonyressource',
  },
  {
    name: 'colonyfood',
  },
  {
    name: 'colonyscientist',
  },
  {
    name: 'colonyexplorer',
  },
  {
    name: 'colonysoldier',
  },
];

function Colony() {
  return (
    <PageContainer>
      <PageHeader height={'350px'} imgWidth={'400px'} imageName={'colony'} title={'Colony'} />
      <PageContent borderLess>
        <CardStack>
          {jobs.map((job) => (
            <CardItem key={job.name} imgName={job.name} height={'150px'} width={'150px'} />
          ))}
        </CardStack>
      </PageContent>
    </PageContainer>
  );
}

export default Colony;