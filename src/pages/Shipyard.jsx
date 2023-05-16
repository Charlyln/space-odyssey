import React, { useContext, useState } from 'react';
import { Card, Typography, Grid, CardMedia, CardActionArea } from '@mui/material';

import { Context } from '../utils/AppContext';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import { getImg } from '../utils/helper';

import CardProgress from '../common/CardProgress';

import { spaceships } from '../utils/constants';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import PageHeader from '../common/PageHeader';

function Shipyard() {
  const { store } = useContext(Context);
  const { user, costs } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();

  const [disabled, setDisabled] = useState(false);

  const getSpaceshipNumber = (spaceshipName) => {
    const filter = user.Spaceships.filter((spaceship) => !spaceship.State.building && spaceship.name === spaceshipName);

    switch (spaceshipName) {
      case 'Fighter':
        return filter.length;

      case 'Cruiser':
        return filter.length;

      case 'BattleShip':
        return filter.length;

      case 'Bomber':
        return filter.length;

      case 'Cargo':
        return filter.length;

      case 'Crawler':
        return filter.length;

      default:
        return 0;
    }
  };

  const build = async () => {
    try {
      if (!disabled) {
        setDisabled(true);

        const body = { userId: user.id, type: 'BuildSpaceship', parameters: { spaceship: elementSelected } };
        await axios.post(`http://${hostname}:${port}/v1/actions`, body);

        const timer = setTimeout(() => setDisabled(false), 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const destroy = async (spaceshipId) => {
    try {
      const body = { userId: user.id, type: 'DeleteSpaceship', parameters: { spaceshipId } };
      await axios.post(`http://${hostname}:${port}/v1/actions`, body);
    } catch (error) {
      console.log(error);
    }
  };

  const selectSpaceship = (spaceship) => {
    try {
      if (elementSelected && elementSelected?.name === spaceship.name) {
        setElementSelected(null);
      } else {
        setElementSelected(spaceship);
      }
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

  const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship.State.building);

  return (
    <>
      <Grid container alignItems='center' sx={{ padding: 1 }}>
        <PageHeader
          height={'250px'}
          imgWidth={elementSelected ? '320px' : '400px'}
          imageName={'shipyard'}
          title={'Shipyard'}
          elementSelected={elementSelected}
          setElementSelected={setElementSelected}
          action={build}
          actionName={'build'}
          costs={costs}
          headerInfosTitle={`Stats`}
          getInfos={getInfos}
        />

        <Grid item xs={12}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {spaceships.map((item, i) => (
              <div key={item.name} style={{ paddingRight: '10px' }}>
                <Card style={{ width: '150px', marginTop: '10px' }} variant='outlined' onClick={() => selectSpaceship(item)}>
                  <CardActionArea>
                    <CardMedia
                      style={{ margin: 'auto', height: '150px', width: '150px' }}
                      component='img'
                      image={getImg(item.name)}
                      alt={item.name}
                    />

                    <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px' }} color='text.secondary'>
                      {getSpaceshipNumber(item.name)}
                    </Typography>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '50px' }}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary'>
            {`Stack:`}
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {buildingSpaceships.map((item, i) => (
              <div key={item.name} style={{ paddingLeft: i !== 0 && '10px' }}>
                <Card style={{ width: '50px', marginTop: '10px' }} variant='outlined' onClick={() => destroy(item.id)}>
                  <CardActionArea>
                    <CardMedia
                      style={{ margin: 'auto', height: '50px', width: '50px' }}
                      component='img'
                      image={getImg(item.name)}
                      alt={item.name}
                    />
                    <CardProgress variant='determinate' progress={item.State.progress} />
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Shipyard;
