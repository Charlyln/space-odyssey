import { Card, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import RessourcesStack from './RessourcesStack';
import PageContent from './PageContent';

export default function MissionItem({ index, mission, action, setElementSelected, planets }) {
  const levelArray = Array.from(Array(mission.level).keys());
  const disableLevel = Array.from(Array(5 - mission.level).keys());

  const progress = mission.progress;
  const isToLaunch = !mission.ongoing && mission.progress === 0;
  const isOngoing = mission.ongoing;
  const isFinish = !mission.ongoing && mission.progress >= 100;

  return (
    <Card
      variant='outlined'
      style={{ backgroundColor: 'unset', marginBottom: '10px' }}
      onMouseEnter={() => setElementSelected(planets[index])}
      onMouseLeave={() => setElementSelected(planets[index])}
    >
      <Stack direction='row' spacing={1} alignItems='center' style={{ backgroundColor: '#4b5d5d', opacity: 0.7 }}>
        <CustomIcon size={25} icon={'mission'} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.name}`}</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <CustomIcon size={50} icon={mission.type} style={{ marginLeft: '30px' }} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.type}`}</Typography>

        {/* {progress < 50 && (
          <CustomButton
            onClick={() => action(mission)}
            name={'come back'}
            width={70}
            height={25}
            fontSize={12}
            primary={'#b34545'}
            secondary={'#721d1d'}
            textColor={'#121212'}
            style={{ marginRight: '10px', marginLeft: 'auto' }}
          />
        )} */}
      </Stack>

      {/* <PageContent style={{ margin: '10px 50px' }}>
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
                <LinearProgress variant='buffer' value={0} valueBuffer={0} />
              </div>

              <CustomIcon size={30} icon={'spaceship'} style={{ transform: 'rotate(90deg)' }} />

              <div style={{ width: `${(progress - 50) * 2}%` }}>
                <LinearProgress variant='determinate' value={100} />
              </div>
            </>
          )}

          <CustomIcon size={40} icon={'arrival'} style={{ marginLeft: 'auto' }} />
        </Stack>
      </PageContent> */}

      {/* <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          component='div'
          style={{ marginLeft: '30px' }}
        >{`Remaining Time: ${'00:34:30'}`}</Typography>
      </Stack> */}

      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        {/* <Typography variant='subtitle1' color='text.secondary' component='div' style={{ marginLeft: '30px' }}>{`Looted:`}</Typography>
        <RessourcesStack size={'50px'} ressources={[{ name: 'fuelprod' }, { name: 'superoxyde' }]} square /> */}
        <Typography color='text.secondary' component='div' variant='subtitle1' style={{ marginLeft: 'auto' }}>{`Level:`}</Typography>
        <Stack direction='row' alignItems='center' style={{ marginRight: '30px' }}>
          {levelArray.map((level) => (
            <CustomIcon key={level} size={25} icon={'level'} />
          ))}
          {disableLevel.map((level) => (
            <CustomIcon style={{ opacity: 0.1 }} key={level} size={25} icon={'level'} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
