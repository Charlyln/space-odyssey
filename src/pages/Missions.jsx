import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import { hostname, port } from '../utils/config';
import ContainerList from '../common/ContainerList';

import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';
import axios from 'axios';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import LaunchMissionItem from '../common/LaunchMissionItem';
import PageContent from '../common/PageContent';
import CustomButton from '../common/CustomButton';
import OngoingMissionItem from '../common/OngoingMissionItem';

function Missions() {
  const { store } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [type, setType] = useState('launch');

  const system = user?.Planet?.System;
  const ongoingMissions = user?.Missions.filter((mission) => mission.ongoing);

  const getHeader = () => {
    try {
      return (
        <>
          <ButtonGroup style={{ position: 'absolute', top: 10, right: 10 }} size='small' variant='outlined'>
            <Button variant={type === 'launch' ? 'contained' : 'outlined'} onClick={() => setType('launch')}>
              launch
            </Button>
            <Button variant={type === 'ongoing' ? 'contained' : 'outlined'} onClick={() => setType('ongoing')}>
              ongoing
            </Button>
          </ButtonGroup>
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
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const launchMission = async (mission) => {
    try {
      const body = { userId: user.id, type: 'LaunchMission', parameters: { missionId: mission.id } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      console.log(response.data);

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
        // action={launchMission}
        // actionName={'Send'}
        // displayButton={elementSelected}
      />

      <PageContent bgColor={'unset'}>
        <ContainerList height={450}>
          {type === 'ongoing' ? (
            <>
              {ongoingMissions.length === 0 ? (
                <Typography variant='subtitle1' color='text.secondary' component='div'>
                  No Onging Missions
                </Typography>
              ) : (
                <>
                  {ongoingMissions.map((mission, index) => (
                    <OngoingMissionItem
                      key={mission.id}
                      mission={mission}
                      action={launchMission}
                      setElementSelected={setElementSelected}
                      elementSelected={elementSelected}
                      planet={user.Planet}
                      planets={user.Planet.System.Planets}
                      potentialLoot={user.Ressources}
                      index={index}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {user.Missions.map((mission, index) => (
                <LaunchMissionItem
                  key={mission.id}
                  mission={mission}
                  action={launchMission}
                  setElementSelected={setElementSelected}
                  elementSelected={elementSelected}
                  planet={user.Planet}
                  planets={user.Planet.System.Planets}
                  potentialLoot={user.Ressources}
                  index={index}
                />
              ))}
            </>
          )}
        </ContainerList>
      </PageContent>
    </PageContainer>
  );
}

export default Missions;
