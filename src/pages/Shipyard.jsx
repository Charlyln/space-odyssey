import React, { useContext, useState } from 'react';
import { Card, Typography, Grid, CardMedia, CardContent, CardActionArea } from '@mui/material';

import { Context } from '../utils/AppContext';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import { getImg } from '../utils/helper';

import CustomButton from '../common/CustomButton';
import CardProgress from '../common/CardProgress';

import shipyard from '../assets/spaceships/shipyard.jpeg';

import { spaceships } from '../utils/constants';

function Shipyard() {
  const {
    store: { user, costs },
  } = useContext(Context);

  const [spaceshipSelected, setSpaceshipSelected] = useState(null);
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

  const getSpaceshipCosts = (spaceshipSelected) => {
    const spaceshipCosts = costs.filter((cost) => cost.craft === spaceshipSelected.name);

    return spaceshipCosts.map((spaceshipCost) => (
      <div style={{ paddingRight: '4px' }}>
        <Card variant='outlined' sx={{ height: '70px', width: '50px', borderRadius: 0 }}>
          <CardMedia sx={{ height: '50px', width: '50px', margin: 'auto' }} image={getImg(spaceshipCost.ressource)} title={'steel'} />
          <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-5px' }}>
            <Typography variant='caption'>{spaceshipCost.value}</Typography>
          </CardContent>
        </Card>
      </div>
    ));
  };

  const build = async () => {
    try {
      if (!disabled) {
        setDisabled(true);

        const body = { userId: user.id, type: 'BuildSpaceship', parameters: { spaceship: spaceshipSelected } };
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
      if (spaceshipSelected && spaceshipSelected?.name === spaceship.name) {
        setSpaceshipSelected(null);
      } else {
        setSpaceshipSelected(spaceship);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship.State.building);

  return (
    <>
      <Grid container alignItems='center' sx={{ padding: 1 }}>
        <Grid item xs={12}>
          <Card style={{ display: 'flex', height: '250px', position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
            <CardMedia
              component='img'
              sx={{ width: spaceshipSelected ? '320px' : '400px' }}
              image={spaceshipSelected ? getImg(spaceshipSelected.name) : shipyard}
              alt='Shipyard'
            />

            <CardContent style={{ width: '100%' }}>
              <Typography component='div' variant='h5'>
                Shipyard
              </Typography>

              {spaceshipSelected && (
                <>
                  <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {spaceshipSelected.name}
                  </Typography>
                  <Grid container style={{ marginTop: '10px' }}>
                    <Grid item xs={4}>
                      <Typography variant='button' color='text.secondary' component='div'>
                        stats:
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' component='div'>
                        {`Attack: ${spaceshipSelected.attack}`}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' component='div'>
                        {`Defence: ${spaceshipSelected.defense}`}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' component='div'>
                        {`Speed: ${spaceshipSelected.speed}`}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' component='div'>
                        {`Capacity: ${spaceshipSelected.capacity}`}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' component='div'>
                        {`Transport: ${spaceshipSelected.transport}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='button' color='text.secondary' component='div'>
                        Costs:
                      </Typography>

                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{getSpaceshipCosts(spaceshipSelected)} </div>
                    </Grid>
                  </Grid>

                  <div style={{ position: 'absolute', right: '0', bottom: '0', padding: '15px', display: 'flex' }}>
                    <CustomButton name={'build'} color={500} width={120} height={40} onClick={build} disabled={disabled} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
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
