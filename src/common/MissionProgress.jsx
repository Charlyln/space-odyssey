import React from 'react';
import moment from 'moment';
import { Card, LinearProgress, Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { fomatNumber } from '../utils/helpers/number.helper';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import RessourcesStack from './RessourcesStack';
import PageContent from './PageContent';

export default function MissionProgress({ progress, status, margin, style, type }) {
  return (
    <PageContent style={{ margin, ...style }} borderLess={type === 'launch'}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <CustomIcon
          size={40}
          icon={'baseMission'}
          style={{ transform: 'rotate(90deg)', opacity: type === 'launch' && progress === 0 && 0.3 }}
        />

        {type === 'launch' ? (
          <>
            <div style={{ width: `${progress}%`, opacity: 0 }}>
              <LinearProgress variant='determinate' value={100} />
            </div>
            <CustomIcon
              size={30}
              icon={'spaceship'}
              style={{ transform: 'rotate(-90deg)', opacity: progress === 0 ? 0.3 : progress >= 100 ? 0 : 1 }}
            />
            <div style={{ width: `${100 - progress}%` }}>
              <LinearProgress
                style={{ transform: 'rotate(180deg)', opacity: progress > 0 ? 1 : 0 }}
                variant={'buffer'}
                value={0}
                valueBuffer={0}
              />
            </div>
          </>
        ) : (
          <>
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
                  <LinearProgress
                    color={progress >= 100 && status === 'finish' ? 'success' : 'primary'}
                    variant='determinate'
                    value={100}
                  />
                </div>
              </>
            )}
          </>
        )}

        {type !== 'launch' && <CustomIcon size={40} icon={'arrival'} style={{ marginLeft: 'auto' }} />}
      </Stack>
    </PageContent>
  );
}
