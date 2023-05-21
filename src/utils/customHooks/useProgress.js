import { useEffect, useState } from 'react';
import { useLongPress, usePress } from 'react-aria';

const useProgress = (onStart, speed) => {
  const [hide, setHide] = useState(false);
  const [progressState, setProgressState] = useState({
    stopPress: false,
    progress: 0,
    disabled: false,
  });
  const [pressed, setpressed] = useState(false);

  const multiplier = speed === 'fast' ? 5 : 3;

  let { longPressProps } = useLongPress({
    accessibilityDescription: 'Long press to activate hyper speed',
    onLongPressStart: (e) => onStartLongPress(),
    onLongPressEnd: (e) => onStopLongPress(),
    onLongPress: (e) => {
      onLongPressed();
    },
    threshold: 5000,
  });

  let { pressProps } = usePress({
    onPress: (e) => {
      onPressed();
    },
  });

  const onStopLongPress = () => {
    if (progressState.progress >= 100) {
      onStart();
    }
  };

  const onLongPressed = () => {
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
              disabled: true,
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
              progress: prev.progress + multiplier,
            };
          } else if (prev.progress < 100) {
            return {
              ...prev,
              progress: prev.progress + multiplier * 2,
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

  return [hide, longPressProps, pressProps, progressState];
};

export default useProgress;
