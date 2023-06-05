import React, { useContext, useState } from 'react';

import axios from 'axios';
import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';
import { Button, ButtonGroup, Typography } from '@mui/material';
import useSelectedElement from '../utils/customHooks/useSelectedElement';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import ContainerList from '../common/ContainerList';
import SolarSystemItem from '../common/SolarSystemItem';
import PageContent from '../common/PageContent';
import MissionsList from '../common/MissionsList';
import { colors } from '../utils/constants';
import CustomButtonGroup from '../common/CustomButtonGroup';

function Missions() {
  const { store } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [type, setType] = useState('created');

  const system = user?.Planet?.System;

  const missions = user?.Missions.filter((mission) => {
    if (type === 'finish') {
      return mission.status === type || mission.status === 'retreived';
    } else {
      return mission.status === type;
    }
  });

  const ongoingMissions = user?.Missions.filter((mission) => mission.status === 'setup');
  const finishMissions = user?.Missions.filter((mission) => mission.status === 'finish');

  const buttons = [
    {
      label: 'launch',
      value: 'created',
      invisible: true,
      selected: type === 'created',
    },
    {
      label: 'ongoing',
      value: 'setup',
      invisible: ongoingMissions.length === 0,
      selected: type === 'setup',
      customcolor: '#1edada',
    },
    {
      label: 'finish',
      value: 'finish',
      invisible: finishMissions.length === 0,
      selected: type === 'finish',
    },
  ];

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

  const getButtons = () => {
    try {
      return (
        <Stack direction='row' alignItems='center'>
          <Typography component='div' variant='h5' style={{ fontFamily: 'monospace' }}>
            {`Missions`}
          </Typography>

          <CustomButtonGroup value={type} buttons={buttons} onChange={setType} style={{ marginLeft: 'auto' }} />
        </Stack>
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

  const retreiveMission = async (mission) => {
    try {
      const body = { userId: user.id, type: 'RetreiveMission', parameters: { missionId: mission.id } };
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

  const comeBackMission = async (mission) => {
    try {
      const body = { userId: user.id, type: 'ComeBackMission', parameters: { missionId: mission.id } };
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
      <PageHeader height={'270px'} imgWidth={'200px'} imageName={'missions'} getChild={getHeader} />

      <PageContent borderLess>{getButtons()}</PageContent>
      <PageContent bgColor={'unset'}>
        <ContainerList height={450}>
          <MissionsList
            type={type}
            missions={missions}
            launchMission={launchMission}
            retreiveMission={retreiveMission}
            comeBackMission={comeBackMission}
            elementSelected={elementSelected}
            setElementSelected={setElementSelected}
            planets={user?.Planet?.System?.Planets}
            planet={user?.Planet}
          />
        </ContainerList>
      </PageContent>
    </PageContainer>
  );
}

export default Missions;
