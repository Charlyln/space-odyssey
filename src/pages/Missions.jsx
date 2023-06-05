import React, { useContext } from 'react';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import SolarSystemItem from '../common/SolarSystemItem';
import ContainerList from '../common/ContainerList';

function Missions() {
  const { store } = useContext(Context);
  const { server } = store;

  return (
    <PageContainer>
      <PageHeader height={'100px'} imgWidth={'150px'} imageName={'missions'} title={'Missions'} />

      <ContainerList height={700}>
        {/* {server.systems.map((system) => (
          <SolarSystemItem key={system.id} planets={server.planets} sunColor={'#fae20a'} sunShadowColor={'orange'} />
        ))} */}
        <SolarSystemItem planets={server.planets} sunColor={'#fae20a'} sunShadowColor={'orange'} size={600} sunSize={100} />
        <SolarSystemItem planets={server.planets} sunColor={'red'} sunShadowColor={'orange'} size={600} sunSize={150} />
        <SolarSystemItem planets={server.planets} sunColor={'#6fcbcd'} sunShadowColor={'#00c7ff'} size={600} sunSize={150} />
        <SolarSystemItem
          planets={server.planets}
          sunColor={'black'}
          sunShadowColor={'orange'}
          size={600}
          sunSize={300}
          defaultScale={0.1}
        />
      </ContainerList>
    </PageContainer>
  );
}

export default Missions;
