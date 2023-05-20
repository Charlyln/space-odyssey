import React, { useContext, useState } from 'react';

import axios from 'axios';
import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';
import { Button, ButtonGroup, Typography } from '@mui/material';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import ContainerList from '../common/ContainerList';
import SolarSystemItem from '../common/SolarSystemItem';
import PageContent from '../common/PageContent';
import MissionsList from '../common/MissionsList';

const StyledBadge = styled(Badge)(({ theme, customColor }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: customColor || '#44b700',
    top: '-2px',
    right: '-2px',
    color: customColor || '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Missions() {
  const { store } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [type, setType] = useState('launch');

  const system = user?.Planet?.System;

  const ongoingMissions = user?.Missions.filter((mission) => mission.ongoing);
  const finishMissions = user?.Missions.filter((mission) => !mission.ongoing && mission.progress >= 100);

  const getHeader = () => {
    try {
      return (
        <>
          <ToggleButtonGroup size='small' value={type} exclusive onChange={(event, newAlignment) => setType(newAlignment)}>
            <ToggleButton value='launch' variant='contained'>
              <Typography component='span' variant='button' style={{ fontSize: '12px' }}>
                launch
              </Typography>
            </ToggleButton>
            <ToggleButton value='ongoing' variant='contained'>
              <StyledBadge
                invisible={ongoingMissions.length === 0}
                customColor={'#1edada'}
                overlap='circular'
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                variant='dot'
              >
                <Typography component='span' variant='button' style={{ fontSize: '12px' }}>
                  ongoing
                </Typography>
              </StyledBadge>
            </ToggleButton>
            <ToggleButton value='finish' variant='contained'>
              <StyledBadge
                invisible={finishMissions.length === 0}
                overlap='circular'
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                variant='dot'
              >
                <Typography component='span' variant='button' style={{ fontSize: '12px' }}>
                  finish
                </Typography>
              </StyledBadge>
            </ToggleButton>
          </ToggleButtonGroup>
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
      <PageHeader height={'300px'} imgWidth={'200px'} imageName={'missions'} title={'Missions'} getChild={getHeader} />
      <PageContent bgColor={'unset'}>
        <ContainerList height={450}>
          <MissionsList
            type={type}
            missions={user?.Missions}
            launchMission={launchMission}
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
