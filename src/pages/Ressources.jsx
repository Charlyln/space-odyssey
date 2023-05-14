import React, { useContext } from 'react';
import { Card, Typography, Grid, CardContent, Box, CardHeader, CardMedia, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Context } from '../utils/AppContext';
import ForwardIcon from '@mui/icons-material/Forward';
import steelMineIcon from '../assets/steelmine.png';
import goldMineIcon from '../assets/goldmine.png';
import axios from 'axios';
import { hostname, port } from '../utils/config';

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
    store: { buildings, user },
    setStore,
  } = useContext(Context);

  const getImg = (buildingName) => {
    switch (buildingName) {
      case 'Steel mine':
        return steelMineIcon;

      case 'Gold mine':
        return goldMineIcon;

      default:
        return steelMineIcon;
    }
  };

  const upgrade = async (item) => {
    try {
      await axios.put(`http://${hostname}:${port}/v1/buildings/${item.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container alignItems='center'>
      {buildings.map((item) => (
        <Grid item xs={4} key={item.name} sx={{ padding: 1 }}>
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
      ))}
    </Grid>
  );
}

export default Ressources;
