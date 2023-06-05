import React, { useContext } from 'react';
import { Typography, IconButton } from '@mui/material';
import { actionTypes } from 'enums/type';
import { Context } from '../utils/AppContext';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import { spaceships } from '../utils/constants';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import PageHeader from '../common/PageHeader';
import PageContent from '../common/PageContent';
import PageContainer from '../common/PageContainer';
import CardStack from '../common/CardStack';
import CloseIcon from '@mui/icons-material/Close';
import CardStackSmall from '../common/CardStackSmall';
import PageHeaderLayout from '../common/PageHeaderLayout';
import PageHeaderCosts from '../common/PageHeaderCosts';
import PageHeaderInfos from '../common/PageHeaderInfos';

function Shipyard() {
  const { store, setStore } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();

  const getFooter = (spaceship) => {
    const spaceshipName = spaceship.name;
    const filter = user.Spaceships.filter((spaceshipItem) => !spaceshipItem.State.building && spaceshipItem.name === spaceshipName);

    return (
      <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px', fontFamily: 'monospace' }} color='text.secondary'>
        {filter.length}
      </Typography>
    );
  };

  const smallGetter = (item) => {
    if (item.State.progress === 0) {
      return (
        <IconButton onClick={() => destroy(item.id)} style={{ position: 'absolute', padding: 0, top: 0, right: 0 }}>
          <CloseIcon style={{ color: 'red' }} />
        </IconButton>
      );
    }
  };

  const build = async () => {
    try {
      const body = { userId: user.id, type: actionTypes.buildSpaceship, parameters: { spaceship: elementSelected } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      if (response.data) {
        setStore((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              Spaceships: [...prevState.user.Spaceships, response.data],
            },
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async (spaceshipId) => {
    try {
      const body = { userId: user.id, type: actionTypes.deleteSpaceship, parameters: { spaceshipId } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      setStore((prevState) => {
        const newState = [...prevState.user.Spaceships];

        const filter = newState.filter((spaceship) => spaceship.id !== response.data);

        return {
          ...prevState,
          user: {
            ...prevState.user,
            Spaceships: filter,
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getInfos = (element) => {
    try {
      return [
        {
          key: 'Attack',
          value: element.attack,
        },
        {
          key: 'Defence',
          value: elementSelected.defense,
        },
        {
          key: 'Speed',
          value: element.speed,
        },
        {
          key: 'Capacity',
          value: element.capacity,
        },
        {
          key: 'Transport',
          value: element.transport,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  };

  const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship?.State?.building);

  return (
    <PageContainer>
      <PageHeader
        height={'250px'}
        imgWidth={elementSelected ? '320px' : '400px'}
        imageName={'shipyard'}
        title={'Shipyard'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
        action={build}
        actionName={'build'}
        costs={user.Costs}
        headerInfosTitle={`Stats:`}
        getInfos={getInfos}
        displayButton={elementSelected}
      >
        <PageHeaderLayout>
          <PageHeaderInfos title={`Stats`}></PageHeaderInfos>
          <PageHeaderCosts costs={user.Costs} element={elementSelected} />
        </PageHeaderLayout>
      </PageHeader>

      <PageContent borderLess>
        <CardStack cardSize={'150px'} array={spaceships} onSelect={setElementSelected} cardGetter={getFooter} />
      </PageContent>

      <PageContent borderLess title='Stack:'>
        <CardStackSmall cardSize={'50px'} array={buildingSpaceships} action={destroy} cardGetter={smallGetter} />
      </PageContent>
    </PageContainer>
  );
}

export default Shipyard;
