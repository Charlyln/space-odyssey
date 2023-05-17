import React, { useContext } from 'react';
import { Card, Typography, Grid, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Context } from '../utils/AppContext';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import InfosList from '../common/InfosList';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const layoutHeight = 360;
const cardHeight = 230;

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
      <PageContainer>
        <PageHeader height={'200px'} imgWidth={'400px'} imageName={'overview'} title={'Overview'} />
        <PageContent borderLess>
          <Grid container alignItems='center'>
            {items.map((item, i) => (
              <Grid item xs={4} key={item.name} sx={{ paddingLeft: i !== 0 ? '4px' : 'unset' }}>
                <Card variant='outlined' style={{ height: `${cardHeight}px` }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                      {item.name}
                    </Typography>
                    <Grid container alignItems='center' sx={{ padding: 1 }}>
                      {item.tasks.length === 0 ? (
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 12 }} color='text.secondary'>
                            No tasks
                          </Typography>
                        </Grid>
                      ) : (
                        <>
                          {item.tasks.map((task) => (
                            <>
                              <Grid item xs={6}>
                                <Typography sx={{ fontSize: 12 }} color='text.secondary'>
                                  {task.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
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
        </PageContent>

        <PageContent>
          <InfosList height={`calc(100vh - ${layoutHeight + cardHeight}px)`} />
        </PageContent>
      </PageContainer>
    </>
  );
}

export default Overview;
