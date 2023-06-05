import React, { useContext } from 'react';
import { Context } from '../utils/AppContext';

import PageContainer from '../common/PageContainer';
import SolarSystemItem from '../common/SolarSystemItem';

const planets1 = [
  {
    size: 25,
    orbit: 250,
    speed: 10,
    color: '#9f4e17',
  },
  {
    size: 55,
    orbit: 380,
    speed: 5,
    color: 'grey',
  },
  {
    size: 40,
    orbit: 600,
    speed: 40,
    color: '#4c4c77',
  },
];

const planets2 = [
  // {
  //   size: 55,
  //   orbit: 400,
  //   speed: 0.9,
  //   color: 'grey',
  // },
  // {
  //   size: 40,
  //   orbit: 500,
  //   speed: 1.2,
  //   color: '#4c4c77',
  // },
  // {
  //   size: 30,
  //   orbit: 600,
  //   speed: 1.4,
  //   color: '#9f4e17',
  // },
  // {
  //   size: 30,
  //   orbit: 700,
  //   speed: 1.7,
  //   color: '#4c4c77',
  // },
  {
    size: 40,
    orbit: 900,
    speed: 1,
    color: '#4c4c77',
  },
  {
    size: 80,
    orbit: 1000,
    speed: 1.2,
    color: '#9f4e17',
  },
  {
    size: 55,
    orbit: 1200,
    speed: 1.4,
    color: 'grey',
  },
];

function Galaxy() {
  const { store } = useContext(Context);
  const { server } = store;

  return (
    <PageContainer>
      {/* <SolarSystemItem planets={planets1} sunColor={'#fae20a'} sunShadowColor={'orange'} size={800} sunSize={200} />
      <SolarSystemItem planets={server.planets} sunColor={'red'} sunShadowColor={'orange'} size={800} sunSize={100} />
      <SolarSystemItem planets={server.planets} sunColor={'#6fcbcd'} sunShadowColor={'#00c7ff'} size={800} sunSize={400} />
      <SolarSystemItem
        planets={planets2}
        sunColor={'black'}
        sunShadowColor={'orange'}
        size={1200}
        sunSize={800}
        defaultScale={0.1}
        shadowSize={30}
        defaultScale={0.3}
      /> */}
    </PageContainer>
  );
}

export default Galaxy;
