import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { mergeProps, useLongPress, usePress } from 'react-aria';
import CustomButton from './CustomButton';
import MissionProgress from './MissionProgress';

export default function LongPressButton({ onStart, style, type }) {
  const [hide, setHide] = useState(false);

  const [progressState, setProgressState] = useState({
    stopPress: false,
    progress: 0,
  });

  const [pressed, setpressed] = useState(false);

  let { longPressProps } = useLongPress({
    accessibilityDescription: 'Long press to activate hyper speed',
    onLongPressStart: (e) => onStartLongPress(),
    onLongPressEnd: (e) => onStopLongPress(),
    onLongPress: (e) => {
      onLongPressed();
    },
    threshold: 3000,
  });

  let { pressProps } = usePress({
    onPress: (e) => {
      onPressed();
    },
  });

  const onStopLongPress = () => {
    console.log('onStopLongPress', progressState.progress);
    if (progressState.progress >= 100) {
      onStart();
    }
  };

  const onLongPressed = () => {
    console.log('onLongPressed');
    setProgressState((prev) => {
      return {
        ...prev,
        stopPress: true,
      };
    });
  };

  const onPressed = () => {
    setProgressState((prev) => {
      return {
        ...prev,
        stopPress: true,
      };
    });
  };

  const onStartLongPress = () => {
    console.log('onStartLongPress');
    setpressed(true);
  };

  useEffect(() => {
    let interval;

    if (pressed) {
      interval = setInterval(() => {
        setProgressState((prev) => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            setpressed(false);
            setTimeout(() => {
              setHide(true);
            }, 1000);
            return {
              ...prev,
              progress: 100,
              stopPress: false,
              mustSendAction: true,
            };
          }
          if (prev.stopPress) {
            clearInterval(interval);
            setpressed(false);
            return {
              ...prev,
              progress: 0,
              stopPress: false,
            };
          } else if (prev.progress < 50) {
            return {
              ...prev,
              progress: prev.progress + 5,
            };
          } else if (prev.progress < 100) {
            return {
              ...prev,
              progress: prev.progress + 10,
            };
          } else {
            clearInterval(interval);
            setpressed(false);
            return {
              ...prev,
              progress: 100,
              stopPress: false,
            };
          }
        });
      }, 80);
    }

    return () => {
      clearInterval(interval);
    };
  }, [pressed]);

  return (
    <div style={{ ...style }}>
      {type === 'refiner' ? (
        <>
          {!hide && (
            <Box sx={{ position: 'absolute' }}>
              <CircularProgress
                variant='determinate'
                sx={{
                  color: 'grey',
                  opacity: 0.2,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
                size={40}
                thickness={6}
                value={100}
              />
              <CircularProgress
                variant='determinate'
                sx={{
                  color: 'grey',
                  position: 'absolute',
                  left: 0,
                }}
                size={40}
                thickness={6}
                value={progressState.progress}
              />
              <Box
                sx={{
                  top: -3,
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
                  {`${progressState.progress}%`}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <MissionProgress
          type={'launch'}
          progress={progressState.progress}
          status={'created'}
          style={{ transform: 'rotate(-90deg)', position: 'absolute', top: '80px', right: '150px', width: '200px' }}
        />
      )}

      <CustomButton
        pressProps={pressProps}
        // onClick={() => comeBackMission(mission)}
        longPressProps={longPressProps}
        label={'begin'}
        color={'green'}
        size={'small'}
        style={{ borderRadius: '0', position: 'absolute', bottom: '44px', left: '44px' }}
        disabled={progressState.mustSendAction}
        // disabled={true}
        progress={progressState.progress}
      />

      {/* <Button
        variant='outlined'
        disabled={progressState.mustSendAction}
        size='small'
        style={{ borderRadius: '0', position: 'absolute', bottom: '44px', left: '44px' }}
      >
        begin
      </Button> */}
    </div>
  );
}
