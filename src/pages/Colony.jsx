import React, { useContext } from 'react';

import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import PageHeader from '../common/PageHeader';
import CardStack from '../common/CardStack';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import PageBody from '../common/PageBody';
import ColonistList from '../common/ColonistList';

const assigments = [
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

const header = '150px';
// const footer = `200px`;

const assigmentsHeight = '100px';
const colonistHeight = `calc(100vh - (110px + ${header} + ${assigmentsHeight}))`;

function Colony() {
  const { store } = useContext(Context);
  const { user } = store;

  const [elementSelected, setElementSelected] = useSelectedElement();

  // console.log(user.Colonists);

  return (
    <PageContainer>
      <PageHeader
        height={header}
        imgWidth={'150px'}
        imageName={'colony'}
        title={'Colony'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
      />

      <PageBody type={'body'} height={assigmentsHeight}>
        <CardStack cardSize={'60px'} array={assigments} onSelect={setElementSelected} />
      </PageBody>
      <PageBody type={'body'} height={colonistHeight}>
        <ColonistList colonists={user.Colonists} height={colonistHeight} assigments={assigments} />
      </PageBody>
    </PageContainer>
  );
}

export default Colony;
