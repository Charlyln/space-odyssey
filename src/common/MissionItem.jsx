import { Button, ButtonGroup, Card, Collapse, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getIcon } from '../utils/helpers/icons.helper';
import { usePress } from 'react-aria';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CustomButton from './CustomButton';
import { fomatNumber } from '../utils/helpers/number.helper';
import RessourcesStack from './RessourcesStack';

// padding: '5px 5px', margin: '5px 0',

export default function MissionItem({ index, mission, action, setElementSelected, elementSelected, planet, planets, potentialLoot }) {
  const levelArray = Array.from(Array(mission.level).keys());
  const disableLevel = Array.from(Array(5 - mission.level).keys());

  return (
    <Card
      variant='outlined'
      style={{ backgroundColor: 'unset', marginBottom: '10px' }}
      onMouseEnter={() => setElementSelected(planets[index])}
      onMouseLeave={() => setElementSelected(planets[index])}
    >
      <Stack direction='row' spacing={1} alignItems='center' style={{ backgroundColor: '#4b5d5d', opacity: 0.7 }}>
        <img style={{ width: '30px', height: '30px' }} src={getIcon('mission')} alt={'mission'} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.name}`}</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center' style={{ padding: '6px' }}>
        <img style={{ width: '50px', height: '50px', marginLeft: '30px' }} src={getIcon(mission.type)} alt={'mission'} />
        <Typography style={{ fontFamily: 'monospace' }}>{`${mission.type}`}</Typography>

        <CustomButton
          onClick={() => setElementSelected(planets[index])}
          name={'select'}
          width={70}
          height={25}
          fontSize={12}
          primary={'#3b87cd'}
          secondary={'#295e8f'}
          textColor={'#121212'}
          style={{ marginLeft: 'auto', marginRight: '10px' }}
          // disabled={elementSelected?.id === planet?.id}
        />

        <CustomButton
          onClick={action}
          name={'launch'}
          width={70}
          height={25}
          fontSize={12}
          primary={'rgb(129, 199, 132)'}
          secondary={'#406441'}
          textColor={'#121212'}
          style={{ marginRight: '10px' }}
          disabled
        />
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
            <img key={level} style={{ width: '25px', height: '25px' }} src={getIcon('level')} alt={'level'} />
          ))}
          {disableLevel.map((level) => (
            <img key={level} style={{ width: '25px', height: '25px', opacity: 0.1 }} src={getIcon('level')} alt={'level'} />
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
        <RessourcesStack size={'50px'} ressources={potentialLoot} square />
        <Typography
          variant='subtitle1'
          color='text.secondary'
          component='div'
          style={{ marginLeft: 'auto' }}
        >{`Fuel required:`}</Typography>
        <RessourcesStack size={'50px'} ressources={[{ ...potentialLoot[0] }]} square footer />
      </Stack>

      {/* <Collapse in={elementSelected?.id === planet?.id} timeout='auto' unmountOnExit>
        <Stack direction='row' alignItems='center' style={{ marginRight: '30px' }}>
          <Typography style={{}}>{`Potential loot:`}</Typography>
          <RessourcesStack cardSize={'50px'} ressources={potentialLoot} square />
        </Stack>
      </Collapse> */}
    </Card>
  );
}
