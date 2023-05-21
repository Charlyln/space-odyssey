import React from 'react';
import moment from 'moment';
import { Card, LinearProgress, Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { fomatNumber } from '../utils/helpers/number.helper';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import RessourcesStack from './RessourcesStack';
import PageContent from './PageContent';

export default function MissionProgress({ progress, status, margin }) {
  return (
    <PageContent style={{ margin }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <CustomIcon size={40} icon={'baseMission'} />

        {progress <= 50 ? (
          <>
            <div style={{ width: `${progress * 2}%` }}>
              <LinearProgress variant='determinate' value={100} />
            </div>
            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(-90deg)' }} />
            <div style={{ width: `${100 - progress * 2}%` }}>
              <LinearProgress style={{ transform: 'rotate(180deg)' }} variant='buffer' value={0} valueBuffer={0} />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: `${100 - (progress - 50) * 2}%` }}>
              <LinearProgress
                color={progress >= 100 && status === 'finish' ? 'success' : 'primary'}
                variant='buffer'
                value={0}
                valueBuffer={0}
              />
            </div>

            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(90deg)' }} />

            <div style={{ width: `${(progress - 50) * 2}%` }}>
              <LinearProgress color={progress >= 100 && status === 'finish' ? 'success' : 'primary'} variant='determinate' value={100} />
            </div>
          </>
        )}

        <CustomIcon size={40} icon={'arrival'} style={{ marginLeft: 'auto' }} />
      </Stack>
    </PageContent>
  );
}