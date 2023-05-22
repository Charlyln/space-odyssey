import React from 'react';
import { LinearProgress, Stack } from '@mui/material';

import CustomIcon from './CustomIcon';
import PageContent from './PageContent';
import { missionStatus } from 'enums';

export default function MissionProgress({ progress, status, margin, style }) {
  return (
    <PageContent style={{ margin, ...style }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <CustomIcon size={40} icon={'baseMission'} style={{ opacity: progress === 0 && 0.3 }} />

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
                color={progress >= 100 && status === missionStatus.finish ? 'success' : 'primary'}
                variant='buffer'
                value={0}
                valueBuffer={0}
              />
            </div>

            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(90deg)' }} />

            <div style={{ width: `${(progress - 50) * 2}%` }}>
              <LinearProgress color={progress >= 100 && status === missionStatus.finish ? 'success' : 'primary'} variant='determinate' value={100} />
            </div>
          </>
        )}

        <CustomIcon size={40} icon={'arrival'} style={{ marginLeft: 'auto' }} />
      </Stack>
    </PageContent>
  );
}
