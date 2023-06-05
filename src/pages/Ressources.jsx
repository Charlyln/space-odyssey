import React, { useContext } from 'react';
import { Card, Typography, Grid, CardContent, Box, CardHeader, CardMedia, Button, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Context } from '../utils/AppContext';
import steelIcon from '../assets/ressources/steel.webp';
import goldIcon from '../assets/ressources/gold.webp';
import platinumIcon from '../assets/ressources/platinum2.webp';
import crystalIcon from '../assets/ressources/crystal.webp';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import ressources from '../assets/ressources/ressources.jpeg';
import factory from '../assets/facilities/factory.jpeg';
import factory2 from '../assets/facilities/factory2.jpeg';
import farm from '../assets/facilities/farm.jpeg';
// import energy from '../assets/facilities/energy.jpeg';

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

function Ressources() {
  const {
    store: { user },
  } = useContext(Context);

  const getImg = (building) => {
    switch (building.name) {
      case 'Steel mine':
        return factory;

      case 'Gold Mine':
        return factory2;

      case 'Biosphere Farm':
        return farm;

      default:
        return factory;
    }
  };

  const getRessourceIcons = (building) => {
    console.log(building.production);
    switch (building.production) {
      case 'steel':
        return <img style={{ width: '25px' }} src={steelIcon} alt={building.production} />;

      case 'gold':
        return <img style={{ width: '25px' }} src={goldIcon} alt={building.production} />;

      case 'platinum':
        return <img style={{ width: '25px' }} src={platinumIcon} alt={building.production} />;

      case 'crystal':
        return <img style={{ width: '25px' }} src={crystalIcon} alt={building.production} />;

      default:
        return <div style={{ width: '25px', height: '7px' }}></div>;
    }
  };

  const upgrade = async (item) => {
    try {
      const body = { userId: user.id, type: 'UpgradeBuilding', parameters: { buildingId: item.id } };
      await axios.post(`http://${hostname}:${port}/v1/actions`, body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      <Grid item xs={12}>
        <Card style={{ display: 'flex', height: '250px', position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
          <CardMedia component='img' sx={{ width: '400px' }} image={ressources} alt='Shipyard' />

          <CardContent style={{ width: '100%' }}>
            <Typography component='div' variant='h5'>
              Ressources
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {user.Buildings.map((item, i) => (
            <div key={item.name} style={{ paddingRight: '10px' }}>
              <Card style={{ width: '150px', marginTop: '10px' }} variant='outlined' onClick={() => {}}>
                <CardActionArea>
                  <CardMedia
                    style={{ margin: 'auto', height: '150px', width: '150px' }}
                    component='img'
                    image={getImg(item)}
                    alt={item.name}
                  />
                  {getRessourceIcons(item)}

                  <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px' }} color='text.secondary'>
                    {item.level}
                  </Typography>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      </Grid>

      {/* {user.Buildings.map((item) => (
        <Grid item xs={3} key={item.name} sx={{ padding: 1 }}>
          <Card style={{ border: item.upgrading ? 'solid 1px grey' : 'solid 1px' }}>
            <CardHeader
              title={item.name}
              action={
                <Button disabled={item.upgrading} size='small' variant='contained' color='success' onClick={() => upgrade(item)}>
                  <ForwardIcon style={{ transform: 'rotate(-90deg)' }} />
                </Button>
              }
            />

            <CardMedia
              style={{ width: '100px', margin: 'auto', opacity: item.upgrading ? 0.3 : 1 }}
              component='img'
              image={getImg(item.name)}
              alt={item.name}
            />

            <CardContent>
              <Typography sx={{ fontSize: 14, float: 'right' }} color='text.secondary'>
                {`Level ${item.level}`}
              </Typography>

              <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={4}>
                  Upgrade
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <BorderLinearProgress variant='determinate' value={item.progress} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant='body2' color='text.secondary'>{`${item.progress}%`}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))} */}
    </Grid>
  );
}

export default Ressources;
