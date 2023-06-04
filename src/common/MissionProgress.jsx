import React from 'react';
import { LinearProgress, Stack } from '@mui/material';

import CustomIcon from './CustomIcon';
import PageContent from './PageContent';
import { missionStatus } from 'enums/status';

export default function MissionProgress({ status, progress, margin, style }) {
  // const progress = 80;
  // const status = missionStatus.finish;

  const getMissionProgress = () => {
    switch (status) {
      case missionStatus.setup:
      case missionStatus.launched:
      case missionStatus.issue:
      case missionStatus.retreived:
        return (
          <>
            <div style={{ width: `${progress}%` }}>
              <LinearProgress variant='determinate' value={100} />
            </div>
            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(-90deg)' }} />
            <div style={{ width: `${100 - progress}%` }}>
              <LinearProgress style={{ transform: 'rotate(180deg)' }} variant='buffer' value={0} valueBuffer={0} />
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <CustomIcon size={40} icon={'arrival'} />
            </div>
          </>
        );

      case missionStatus.destination:
        return (
          <>
            <div style={{ width: `${100}%` }}>
              {/* <LinearProgress variant='determinate' value={100} style={{ opacity: 0.3 }} /> */}
            </div>
            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(-90deg)' }} />
            <div style={{ width: `${0}%` }}>
              <LinearProgress style={{ transform: 'rotate(180deg)' }} variant='buffer' value={0} valueBuffer={0} />
            </div>
            <div style={{ marginLeft: 'auto' }} className={'blink'}>
              <CustomIcon size={40} icon={'atlas'} />
            </div>
          </>
        );

      case missionStatus.comeback:
        return (
          <>
            <div style={{ width: `${100 - progress}%` }}>
              <LinearProgress
                color={progress >= 100 && status === missionStatus.finish ? 'success' : 'primary'}
                variant='buffer'
                value={0}
                valueBuffer={0}
              />
            </div>
            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(90deg)' }} />
            <div style={{ width: `${progress}%` }}>
              <LinearProgress
                color={progress >= 100 && status === missionStatus.finish ? 'success' : 'primary'}
                variant='determinate'
                value={100}
              />
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <CustomIcon size={40} icon={'atlas'} />
            </div>
          </>
        );

      case missionStatus.finish:
        return (
          <>
            <div style={{ width: `${0}%` }}>
              <LinearProgress
                color={progress >= 100 && status === missionStatus.finish ? 'success' : 'primary'}
                variant='buffer'
                value={0}
                valueBuffer={0}
              />
            </div>
            <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(90deg)' }} />
            <div style={{ width: `${100}%` }}>
              <LinearProgress color={'success'} variant='determinate' value={100} />
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <CustomIcon size={40} icon={'atlas'} />
            </div>
          </>
        );
      default:
        return '';
    }
  };

  return (
    <PageContent style={{ margin, ...style }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <CustomIcon size={40} icon={'baseMission'} style={{ opacity: progress === 0 && 0.3 }} />
        {getMissionProgress()}
      </Stack>
    </PageContent>
  );
}
