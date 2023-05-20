import { Button, ButtonGroup, Card, Collapse, Stack, Typography } from '@mui/material';
import React from 'react';
import { getIcon } from '../utils/helpers/icons.helper';
import CustomButton from './CustomButton';
import { fomatNumber } from '../utils/helpers/number.helper';
import RessourcesStack from './RessourcesStack';
import CustomIcon from './CustomIcon';

export default function LaunchMissionItem({ index, mission, action, setElementSelected, elementSelected, planet, planets, potentialLoot }) {
  const levelArray = Array.from(Array(mission.level).keys());
  const disableLevel = Array.from(Array(5 - mission.level).keys());

  const disableMission = mission.ongoing;

  return (
    <Card
      variant='outlined'
      style={{ backgroundColor: 'unset', marginBottom: '10px', opacity: disableMission && 0.5 }}
      onMouseEnter={() => setElementSelected(planets[index])}
      onMouseLeave={() => setElementSelected(planets[index])}
    >
      <Stack direction='row' spacing={1} alignItems='center' style={{ backgroundColor: '#4b5d5d', opacity: 0.7 }}>
        <CustomIcon size={30} icon={'mission'} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.name}`}</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <CustomIcon size={50} icon={mission.type} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.type}`}</Typography>

        {!disableMission ? (
          <CustomButton
            onClick={() => action(mission)}
            name={'launch'}
            width={70}
            height={25}
            fontSize={12}
            primary={'rgb(129, 199, 132)'}
            secondary={'#406441'}
            textColor={'#121212'}
            style={{ marginRight: '10px', marginLeft: 'auto' }}
          />
        ) : (
          <Typography style={{ fontFamily: 'monospace', marginRight: '10px', marginLeft: 'auto' }}>{'On going...'}</Typography>
        )}
      </Stack>

      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <Typography variant='subtitle1' color='text.secondary' component='div' style={{ marginLeft: '30px' }}>{`Distance: ${fomatNumber(
          100000,
        )} KM`}</Typography>
      </Stack>

      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          component='div'
          style={{ marginLeft: '30px' }}
        >{`Duration: ${'00:50:00'}`}</Typography>

        <Typography color='text.secondary' component='div' variant='subtitle1' style={{ marginLeft: 'auto' }}>{`Level:`}</Typography>
        <Stack direction='row' alignItems='center' style={{ marginRight: '30px' }}>
          {levelArray.map((level) => (
            <CustomIcon key={level} size={25} icon={'level'} />
          ))}
          {disableLevel.map((level) => (
            <CustomIcon key={level} style={{ opacity: 0.1 }} size={25} icon={'level'} />
          ))}
        </Stack>
      </Stack>

      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          component='div'
          style={{ marginLeft: '30px' }}
        >{`Potential loot:`}</Typography>
        <RessourcesStack
          size={'50px'}
          ressources={[{ name: 'cube' }, { name: 'fuelprod' }, { name: 'launchfuel' }, { name: 'powercell' }, { name: 'superoxyde' }]}
          square
        />
        <Typography
          variant='subtitle1'
          color='text.secondary'
          component='div'
          style={{ marginLeft: 'auto' }}
        >{`Fuel required:`}</Typography>
        <RessourcesStack size={'50px'} ressources={[{ name: 'warpcell', value: 1 }]} square footer />
      </Stack>
    </Card>
  );
}
