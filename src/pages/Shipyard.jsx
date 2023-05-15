import React, { useContext, useState } from 'react';
import { Card, Typography, Grid, CardMedia, Box, CardContent, CardActionArea, Button } from '@mui/material';
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

import steelIcon from '../assets/steel.png';
import goldIcon from '../assets/gold.png';
import peopleIcon from '../assets/people.png';
import spaceshipIcon from '../assets/spaceship.png';
import plutoniumIcon from '../assets/plutonium.png';
import energyIcon from '../assets/energy.png';
import foodIcon from '../assets/food.png';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function Shipyard() {
  const {
    store: { user },
  } = useContext(Context);

  const [spaceshipSelected, setSpaceshipSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const getImg = (buildingName) => {
    switch (buildingName) {
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

  const build = async (item) => {
    try {
      setDisabled((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const selectSpaceship = (spaceship) => {
    try {
      if (spaceshipSelected && spaceshipSelected?.id === spaceship.id) {
        setSpaceshipSelected(null);
      } else {
        setSpaceshipSelected(spaceship);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                          <Card variant='outlined' sx={{ height: '60px', width: '60px' }}>
                            <CardMedia sx={{ height: '40px', width: '40px', margin: 'auto' }} image={steelIcon} title={'steel'} />
                            <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-7px' }}>
                              <Typography variant='caption'>{`100`}</Typography>
                            </CardContent>
                          </Card>
                        </div>
                        <div style={{ paddingRight: '4px' }}>
                          <Card variant='outlined' sx={{ height: '60px', width: '60px' }}>
                            <CardMedia sx={{ height: '40px', width: '40px', margin: 'auto' }} image={goldIcon} title={'steel'} />
                            <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-7px' }}>
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

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {user.Spaceships.map((item, i) => (
            <div style={{ paddingLeft: i !== 0 && '10px' }}>
              <Card key={item.name} style={{ width: '150px', marginTop: '10px' }} variant='outlined' onClick={() => selectSpaceship(item)}>
                <CardActionArea>
                  <CardMedia
                    style={{ margin: 'auto', height: '150px', width: '150px' }}
                    component='img'
                    image={getImg(item.name)}
                    alt={item.name}
                  />

                  <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px' }} color='text.secondary'>
                    {`0`}
                  </Typography>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      </Grid>
    </>
  );
}

export default Shipyard;
