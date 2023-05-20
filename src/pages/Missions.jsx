import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import { hostname, port } from '../utils/config';
import ContainerList from '../common/ContainerList';

import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';
import axios from 'axios';
import { Stack, Typography } from '@mui/material';
import MissionItem from '../common/MissionItem';
import PageContent from '../common/PageContent';

function Missions() {
  const { store } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const system = user?.Planet?.System;

  const getHeader = () => {
    try {
      return (
        <SolarSystemItem
          planets={system?.Planets}
          sunColor={system.sunColor}
          sunShadowColor={system.sunShadow}
          size={system.size}
          sunSize={system.sunSize}
          defaultScale={0.3}
          setElementSelected={setElementSelected}
          elementSelected={elementSelected}
          disableButtons
          basePlanet={user.Planet}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendMission = async (item) => {
    try {
      const body = { userId: user.id, type: 'SendMission', parameters: { planetId: elementSelected.id } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      // setStore((prevState) => {
      //   const newState = [...prevState.user.Buildings];
      //   const index = newState.findIndex((building) => building.id === response.data.id);

      //   if (index !== -1) {
      //     newState[index] = response.data;

      //     return {
      //       ...prevState,
      //       user: {
      //         ...prevState.user,
      //         Buildings: newState,
      //       },
      //     };
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        height={'300px'}
        imgWidth={'200px'}
        imageName={'missions'}
        title={'Missions'}
        getChild={getHeader}
        // action={sendMission}
        // actionName={'Send'}
        // displayButton={elementSelected}
      />

      <PageContent bgColor={'unset'} borderLess>
        <Typography variant='subtitle1' color='text.secondary' component='div'>
          Available:
        </Typography>
      </PageContent>

      <PageContent bgColor={'unset'}>
        <ContainerList height={400}>
          {user.Missions.map((mission, index) => (
            <MissionItem
              mission={mission}
              action={sendMission}
              setElementSelected={setElementSelected}
              elementSelected={elementSelected}
              planet={user.Planet}
              planets={user.Planet.System.Planets}
              potentialLoot={user.Ressources}
              index={index}
            />
          ))}
        </ContainerList>
      </PageContent>
    </PageContainer>
  );
}

export default Missions;
