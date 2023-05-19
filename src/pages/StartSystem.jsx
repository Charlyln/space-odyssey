import React, { useState } from 'react';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';

import '../common/css/galaxy.css';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getrandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  randomColor = '#' + randomColor;
  return randomColor;
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

console.log(makeid(5));

function Galaxy() {
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [displayHeader, setdisplayHeader] = useState(true);

  const planetNbr = randomIntFromInterval(2, 8);
  const sunSize = 200;
  const planets = [];

  let orbitMaring = 0;
  let orbitCounter = 0;

  for (let i = 0; i < planetNbr; i++) {
    const newId = makeid(10);
    const randomColor = getrandomColor();
    const randomSpeed = randomIntFromInterval(2, 30);
    const randomSize = randomIntFromInterval(15, 50);

    const randomOffset = randomIntFromInterval(10, 50);

    const randomOrbit = sunSize + randomSize + orbitMaring + orbitCounter + randomOffset;
    orbitCounter = orbitCounter + randomSize + randomOffset;
    orbitMaring = orbitMaring + randomSize;

    planets.push({
      id: newId,
      name: newId,
      size: randomSize,
      orbit: randomOrbit,

      speed: randomSpeed,
      color: randomColor,
    });
  }

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
        planets={planets}
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
