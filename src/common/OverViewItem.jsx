import React, { useContext } from 'react';
import { Card, Typography, Grid, CardContent, Box, Stack } from '@mui/material';

import { Context } from '../utils/AppContext';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import ContainerList from '../common/ContainerList';

import InfosList from '../common/InfosList';
import CardProgress from '../common/CardProgress';

import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import MissionProgress from './MissionProgress';
import { missionStatus } from 'enums/status';

export default function OverviewItem({ item, height }) {
  return (
    <Grid item xs={4} key={item.name} mt={1}>
      <Card variant='outlined' style={{ height: `calc(${height} - 16px)` }}>
        <CardContent style={{ padding: '8px' }}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary'>
            {item.name}
          </Typography>

          {item.tasks.length === 0 ? (
            <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
              <Typography sx={{ fontSize: 12 }} color='text.secondary'>
                No tasks
              </Typography>
            </Stack>
          ) : (
            <>
              <ContainerList height={`calc(${height} - 55px)`}>
                <TransitionGroup>
                  {item.tasks.map((task) => (
                    <Collapse key={task.id}>
                      {task.ongoing || task.status === missionStatus.finish ? (
                        <MissionProgress progress={task.progress} status={task.status} margin={'2px 0px'} />
                      ) : (
                        <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '0px' }}>
                          <Typography sx={{ fontSize: 12 }} color='text.secondary'>
                            {`${task.name}`}
                          </Typography>

                          <div style={{ width: '20%', marginLeft: 'auto' }}>
                            <CardProgress progress={task.progress} height={10} rounded='true' />
                          </div>

                          <div style={{ width: '10%' }}>
                            <Typography variant='body2' color='text.secondary'>{`${task.progress}%`}</Typography>
                          </div>
                        </Stack>
                      )}
                    </Collapse>
                  ))}
                </TransitionGroup>
              </ContainerList>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
