import React from 'react';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';

import '../common/css/galaxy.css';
import OrbitSystem from '../common/OrbitSytem';
import useSelectedElement from '../utils/customHooks/useSelectedElement';

const planets = [
  {
    name: 'JKCS-041',
    size: 25,
    orbit: 250,
    speed: 30,
    color: '#9f4e17',
  },
  {
    name: 'SPT0346-52',
    size: 40,
    orbit: 500,
    speed: 40,
    color: '#4c4c77',
  },
  {
    name: 'A1689-zD1',
    size: 55,
    orbit: 380,
    speed: 20,
    color: 'grey',
  },
];

function Galaxy() {
  const [elementSelected, setElementSelected] = useSelectedElement();

  return (
    <PageContainer>
      <PageHeader
        height={'110px'}
        imgWidth={'200px'}
        imageName={'galaxy'}
        title={'System'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
      />

      <PageContent>
        <OrbitSystem planets={planets} select={setElementSelected} />
      </PageContent>
    </PageContainer>
  );
}

export default Galaxy;
