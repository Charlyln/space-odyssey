import React, { useContext, useState } from 'react';
import { Context } from '../utils/AppContext';
import { actionTypes } from 'enums/type';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import { hostname, port } from '../utils/config';
import ContainerList from '../common/ContainerList';

import useSelectedElement from '../utils/customHooks/useSelectedElement';
import SolarSystemItem from '../common/SolarSystemItem';
import axios from 'axios';
import { Stack, Typography } from '@mui/material';

function Galaxy() {
  const { store } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();
  const [displayHeader, setdisplayHeader] = useState(true);
  // const [missions, setMissions] = useState(user.Missions);
  const system = user?.Planet?.System;

  const getHeader = () => {
    const missions = user.Missions.filter((mission) => mission.type === 'Rescue');

    try {
      if (elementSelected) {
        return (
          <>
            <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
              <div
                className='planet'
                id={`planet${elementSelected.name}`}
                style={{
                  width: `50px`,
                  height: `50px`,
                  backgroundColor: `${elementSelected.color}`,
                  boxShadow: `0 0 ${30}px ${elementSelected.color}`,
                  borderRadius: '50%',
                  // position: 'relative',
                }}
              />

              <ContainerList height={100}>
                {missions.map((mission) => (
                  <>
                    <Typography variant='button' color='text.secondary' component='div'>
                      {mission.type}
                    </Typography>
                  </>
                ))}
              </ContainerList>
            </Stack>
          </>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMission = async (item) => {
    try {
      const body = { userId: user.id, type: actionTypes.startMission, parameters: { planetId: elementSelected.id } };
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
      {displayHeader && (
        <PageHeader
          height={'200px'}
          imgWidth={'200px'}
          imageName={'solar_system'}
          title={'Star System'}
          getChild={getHeader}
          action={sendMission}
          actionName={'Send'}
          displayButton={elementSelected}
        />
      )}

      <SolarSystemItem
        planets={system?.Planets}
        sunColor={system.sunColor}
        sunShadowColor={system.sunShadow}
        size={system.size}
        sunSize={system.sunSize}
        defaultScale={0.3}
        setdisplayHeader={setdisplayHeader}
        setElementSelected={setElementSelected}
        elementSelected={elementSelected}
        basePlanet={user.Planet}
      />
    </PageContainer>
  );
}

export default Galaxy;
