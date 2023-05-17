import React from 'react';

import PageContainer from '../common/PageContainer';
import PageHeader from '../common/PageHeader';
import PageContent from '../common/PageContent';
import CardStack from '../common/CardStack';
import useSelectedElement from '../utils/customHooks/useSelectedElement';

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
  const [elementSelected, setElementSelected] = useSelectedElement();

  return (
    <PageContainer>
      <PageHeader
        height={'350px'}
        imgWidth={'400px'}
        imageName={'colony'}
        title={'Colony'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
      />

      <PageContent borderLess>
        <CardStack cardSize={'150px'} array={jobs} onSelect={setElementSelected} />
      </PageContent>
    </PageContainer>
  );
}

export default Colony;
