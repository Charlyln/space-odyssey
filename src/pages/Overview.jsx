import React, { useContext } from 'react';
import { Card, Typography, Grid, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Context } from '../utils/AppContext';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PageHeader from '../common/PageHeader';

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

function Overview() {
  const {
    store: { user },
  } = useContext(Context);

  const items = [
    {
      name: 'Buildings',
      tasks: user.Buildings.filter((building) => building.upgrading),
    },
    {
      name: 'Research',
      tasks: [],
    },
    {
      name: 'Missions',
      tasks: [],
    },
  ];

  return (
    <>
      <Grid container alignItems='center' sx={{ padding: 1 }}>
        <PageHeader height={'250px'} imgWidth={'400px'} imageName={'overview'} title={'Overview'} />
      </Grid>
      <Grid container alignItems='center' sx={{ padding: 1 }}>
        {items.map((item) => (
          <Grid item xs={4} key={item.name} sx={{ paddingRight: '4px' }}>
            <Card style={{ border: 'solid 1px' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                  {item.name}
                </Typography>

                <Grid container alignItems='center' sx={{ padding: 1 }}>
                  {item.tasks.length === 0 ? (
                    <Grid item xs={4}>
                      No tasks
                    </Grid>
                  ) : (
                    <>
                      {item.tasks.map((task) => (
                        <>
                          <Grid item xs={4}>
                            {task.name}
                          </Grid>
                          <Grid item xs={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ width: '100%', mr: 1 }}>
                                <BorderLinearProgress variant='determinate' value={task.progress} />
                              </Box>
                              <Box sx={{ minWidth: 35 }}>
                                <Typography variant='body2' color='text.secondary'>{`${task.progress}%`}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </>
                      ))}
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Overview;
