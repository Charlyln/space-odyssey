import React, { useContext, useState } from 'react';

import { Context } from '../utils/AppContext';
import RessourcesStack from '../common/RessourcesStack';
import PageContainer from '../common/PageContainer';
import PageBody from '../common/PageBody';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import RessourceItem from '../common/RessourceItem';
import { Box, Button, Chip, IconButton, Stack, StepConnector, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import LongPressButton from '../common/LongPressButton';

const header = '350px';
const body = `calc(100vh - (110px + ${header}))`;

function Trade() {
  const { store } = useContext(Context);
  const { user } = store;
  const [craft, setCraft] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [recipe, setRecipe] = useState({ id: 'result', name: 'result', value: 0 });
  const [recipeResult, setRecipeResult] = useState(false);

  const steps = [
    { label: 'Inputs' },
    { label: 'Input' },
    { label: 'Refiner' },
    { label: 'Output' },
    { label: 'Outputs' },
    { label: 'Progress' },
  ];

  const getStep = (label) => {
    try {
      switch (label) {
        case 'Inputs':
          return craft.map((craft) => (
            <RessourceItem key={craft.id} ressource={craft} onClick={() => {}} ressource={craft} size={'70px'} square disabled />
          ));

        case 'Refiner':
          return (
            <div>
              <RessourceItem ressource={{ id: 'refiner', name: 'refiner' }} size={'150px'} square disabled />
            </div>
          );

        case 'Outputs':
          return <RessourceItem ressource={recipe} size={'100px'} square disabled header='Chromatique Metal' footer />;

        case 'Progress':
          return (
            <>
              <Box sx={{ position: 'relative' }}>
                <CircularProgress
                  variant='determinate'
                  sx={{
                    color: 'grey',
                    opacity: 0.5,
                  }}
                  size={80}
                  thickness={4}
                  value={100}
                />
                <CircularProgress
                  variant='determinate'
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    left: 0,
                  }}
                  size={80}
                  thickness={4}
                  value={10}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant='caption' component='div' color='text.secondary'>
                    {`0%`}
                  </Typography>
                </Box>
              </Box>
            </>
          );

        default:
          return <Chip size={'small'} label={label} variant='outlined' />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onStart = () => {
    try {
      console.log('send action');
    } catch (error) {
      console.log(error);
    }
  };

  const getHeader = () => {
    try {
      return (
        <>
          <Stepper>
            {steps.map((step) => (
              <Step key={step.label}>{getStep(step.label)}</Step>
            ))}
          </Stepper>

          <Stack direction='row' style={{ padding: '6px' }}>
            {/* <Button variant='outlined' size='small' style={{ borderRadius: '0', marginLeft: 'auto' }}>
              begin
            </Button>
            <Button variant='outlined' size='small' style={{ borderRadius: '0' }}>
              start
            </Button> */}

            <LongPressButton type='refiner' onStart={onStart} style={{ marginLeft: 'auto', position: 'relative', height: '80px', width: '200px' }} />
          </Stack>

          {recipeResult && (
            <IconButton
              onClick={() => setCraft([{ id: 1 }, { id: 2 }, { id: 3 }])}
              size={'small'}
              style={{ position: 'absolute', bottom: '16px', left: '34px' }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (element) => {
    try {
      setCraft((prev) => {
        const newState = [...prev];
        const find = newState.find((item) => item.name === element.name);

        if (find) {
          return prev;
        } else {
          const index = newState.findIndex((item) => !item.name);
          newState[index] = element;
          return newState;
        }
      });

      setRecipe({ id: 'sub1', name: 'sub1', value: 25 });
      setRecipeResult(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <PageBody type={'header'} height={header}>
        {getHeader()}
      </PageBody>
      <PageBody type={'body'} height={body}>
        <RessourcesStack size={'70px'} ressources={user.Ressources} onClick={onSelect} square footer />
      </PageBody>
    </PageContainer>
  );
}

export default Trade;
