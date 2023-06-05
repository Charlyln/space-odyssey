import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';

import '../common/css/galaxy.css';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';

function Galaxy() {
  const { store } = useContext(Context);
  const { server } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [displayHeader, setdisplayHeader] = useState(true);

  return (
    <PageContainer>
      {displayHeader && (
        <PageHeader
          height={'110px'}
          imgWidth={'200px'}
          imageName={'galaxy'}
          title={'Star System'}
          elementSelected={elementSelected}
          setElementSelected={setElementSelected}
        />
      )}

      <SolarSystemItem
        planets={[]}
        sunColor={'#fae20a'}
        sunShadowColor={'orange'}
        size={1000}
        sunSize={200}
        setdisplayHeader={setdisplayHeader}
        defaultScale={0.5}
      />
    </PageContainer>
  );
}

export default Galaxy;
