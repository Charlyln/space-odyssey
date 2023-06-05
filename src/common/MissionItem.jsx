import React from 'react';
import moment from 'moment';
import { Card, LinearProgress, Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { fomatNumber } from '../utils/helpers/number.helper';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import RessourcesStack from './RessourcesStack';
import MissionProgress from './MissionProgress';
import PageContent from './PageContent';

export default function MissionItem({ index, mission, launchMission, retreiveMission, comeBackMission, setElementSelected, planets }) {
  const levelArray = Array.from(Array(mission.level).keys());
  const disableLevel = Array.from(Array(5 - mission.level).keys());

  const progress = mission.progress;

  const getButton = () => {
    switch (mission.status) {
      case 'created':
        return (
          <CustomButton
            onClick={() => launchMission(mission)}
            label={'launch'}
            color={'green'}
            size={'small'}
            style={{ marginRight: '10px', marginLeft: 'auto' }}
          />
        );

      case 'setup':
        if (progress < 50) {
          return (
            <CustomButton
              onClick={() => comeBackMission(mission)}
              label={'come back'}
              color={'red'}
              size={'small'}
              style={{ marginRight: '10px', marginLeft: 'auto' }}
            />
          );
        } else {
          return '';
        }

      case 'finish':
        return (
          <CustomButton
            onClick={() => retreiveMission(mission)}
            label={'retreive'}
            color={'green'}
            size={'small'}
            style={{ marginRight: '10px', marginLeft: 'auto' }}
          />
        );

      default:
        return '';
    }
  };

  const getMissionBody = () => {
    switch (mission.status) {
      case 'created':
        return (
          <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
            <Typography variant='subtitle1' color='text.secondary' component='div' style={{ marginLeft: '30px' }}>{`Distance: ${fomatNumber(
              100000,
            )} KM`}</Typography>

            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
              style={{ marginLeft: '30px' }}
            >{`Duration: ${'00:50:00'}`}</Typography>
          </Stack>
        );

      case 'setup':
      case 'finish':
        return (
          <>
            <MissionProgress progress={progress} status={mission.status} margin={'10px 50px'} />
            <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
                style={{ marginLeft: '30px' }}
              >{`Remaining Time: ${'00:34:30'}`}</Typography>
            </Stack>
          </>
        );

      case 'retreived':
        return (
          <Card
            variant='outlined'
            style={{
              padding: '5px 5px',
              margin: '10px 50px',
              backgroundColor: 'unset',
              border: '1px solid rgb(129, 199, 132)',
            }}
          >
            <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
              <TaskAltIcon style={{ color: 'rgb(129, 199, 132)' }} />
              <span style={{ opacity: '0.3' }}>{`Retreived on ${moment(mission?.updatedAt).format('D MMM YYYY HH:mm')}`}</span>
            </Stack>
          </Card>
        );

      default:
        return '';
    }
  };

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
        <Typography style={{ fontFamily: 'monospace', width: '20%' }}>{`${mission.type}`}</Typography>

        <Typography color='text.secondary' component='div' variant='subtitle1' style={{}}>{`Level:`}</Typography>
        <Stack direction='row' alignItems='center' style={{ marginRight: '30px' }}>
          {levelArray.map((level) => (
            <CustomIcon key={level} size={25} icon={'level'} />
          ))}
          {disableLevel.map((level) => (
            <CustomIcon style={{ opacity: 0.1 }} key={level} size={25} icon={'level'} />
          ))}
        </Stack>
        {getButton()}
      </Stack>

      {getMissionBody()}

      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <Typography variant='subtitle1' color='text.secondary' component='div' style={{ marginLeft: '30px' }}>{`Loot:`}</Typography>
        <RessourcesStack
          size={'50px'}
          ressources={[
            { id: 'fuelprod', name: 'fuelprod' },
            { id: 'superoxyde', name: 'superoxyde' },
          ]}
          square
        />

        {mission.status === 'created' && (
          <>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
              style={{ marginLeft: 'auto' }}
            >{`Fuel required:`}</Typography>
            <RessourcesStack size={'50px'} ressources={[{ id: 'warpcell', name: 'warpcell', value: 1 }]} square footer />
          </>
        )}
      </Stack>
    </Card>
  );
}
