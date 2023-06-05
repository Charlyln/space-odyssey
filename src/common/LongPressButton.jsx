import React from 'react';
import CustomButton from './CustomButton';
import useProgress from '../utils/customHooks/useProgress';
import CircularLoading from './CircularLoading';
import LaunchingProgress from './LaunchingProgress';

export default function LongPressButton({ onStart, style, type, label, color, size }) {
  const [hide, longPressProps, pressProps, progressState] = useProgress(onStart, 'slow');

  const getLoader = () => {
    switch (type) {
      case 'refiner':
        return <CircularLoading hide={hide} progress={progressState.progress} />;

      case 'launch':
        return <LaunchingProgress hide={hide} progress={progressState.progress} />;

      case 'retreive':
        return <LaunchingProgress progress={0} />;

      default:
        return '';
    }
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <CustomButton
        pressProps={pressProps}
        longPressProps={longPressProps}
        label={label}
        color={color}
        size={size}
        progress={progressState.progress}
        disabled={progressState.disabled}
      />
      {getLoader()}
    </div>
  );
}
