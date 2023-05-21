import React from 'react';
import { LinearProgress, Stack } from '@mui/material';

import CustomIcon from './CustomIcon';
import PageContent from './PageContent';

export default function LaunchingProgress({ hide, progress }) {
  if (hide) {
    return '';
  }

  return (
    <PageContent
      style={{ position: 'absolute', top: '-100px', right: '-50px', zIndex: -1, width: '170px', transform: 'rotate(-90deg)' }}
      borderLess
    >
      <Stack direction='row' spacing={1} alignItems='center'>
        <CustomIcon size={40} icon={'baseMission'} style={{ transform: 'rotate(90deg)', opacity: progress === 0 && 0.3 }} />

        <div style={{ width: `${progress}%`, opacity: 0.3 }}>
          <LinearProgress variant='determinate' value={100} />
        </div>
        <CustomIcon
          size={30}
          icon={'spaceship'}
          style={{ transform: 'rotate(-90deg)', opacity: progress === 0 ? 0.3 : progress >= 100 ? 0 : 1, marginLeft: '-20px' }}
        />
        <div style={{ width: `${100 - progress}%` }}>
          <LinearProgress style={{ opacity: progress > 0 ? 1 : 0 }} variant={'buffer'} value={0} valueBuffer={0} />
        </div>
      </Stack>
    </PageContent>
  );
}
