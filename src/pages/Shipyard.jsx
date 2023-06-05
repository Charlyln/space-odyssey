import React, { useContext, useState } from 'react';
import { Card, Typography, Grid, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Context } from '../utils/AppContext';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import CustomButton from '../common/CustomButton';

import fighter from '../assets/spaceships/fighter.jpeg';
import cruiser from '../assets/spaceships/cruiser.jpeg';
import battleShip from '../assets/spaceships/battleship.jpeg';
import bomber from '../assets/spaceships/bomber.jpeg';
import cargo from '../assets/spaceships/cargo.jpeg';
import crawler from '../assets/spaceships/crawler.jpeg';
import shipyard from '../assets/spaceships/shipyard.jpeg';

import steelIcon from '../assets/ressources/steel.webp';
import goldIcon from '../assets/ressources/gold.webp';
import { spaceships } from '../utils/constants';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'unset',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: 'green',
  },
}));

function Shipyard() {
  const {
    store: { user },
  } = useContext(Context);

  const [spaceshipSelected, setSpaceshipSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const getImg = (spaceshipName) => {
    switch (spaceshipName) {
      case 'Fighter':
        return fighter;

      case 'Cruiser':
        return cruiser;

      case 'BattleShip':
        return battleShip;

      case 'Bomber':
        return bomber;

      case 'Cargo':
        return cargo;

      case 'Crawler':
        return crawler;

      default:
        return fighter;
    }
  };

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
              sx={{ width: spaceshipSelected ? '320px' : '450px' }}
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

                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ paddingRight: '4px' }}>
                          <Card variant='outlined' sx={{ height: '70px', width: '50px', borderRadius: 0 }}>
                            <CardMedia sx={{ height: '50px', width: '50px', margin: 'auto' }} image={steelIcon} title={'steel'} />
                            <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-5px' }}>
                              <Typography variant='caption'>{`100`}</Typography>
                            </CardContent>
                          </Card>
                        </div>
                        <div style={{ paddingRight: '4px' }}>
                          <Card variant='outlined' sx={{ height: '70px', width: '50px', borderRadius: 0 }}>
                            <CardMedia sx={{ height: '50px', width: '50px', margin: 'auto' }} image={goldIcon} title={'steel'} />
                            <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-5px' }}>
                              <Typography variant='caption'>{`50`}</Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <div style={{ position: 'absolute', right: '0', bottom: '0', padding: '15px' }}>
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
                <Card style={{ width: '50px', marginTop: '10px' }} variant='outlined' onClick={() => selectSpaceship(item)}>
                  <CardMedia
                    style={{ margin: 'auto', height: '50px', width: '50px' }}
                    component='img'
                    image={getImg(item.name)}
                    alt={item.name}
                  />
                  <BorderLinearProgress variant='determinate' value={item.State.progress} />
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
