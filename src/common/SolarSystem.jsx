import PlanetOrbit from './PlanetOrbit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton, Stack } from '@mui/material';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import PlanetButton from './PlanetButton';
import ExpandIcon from '@mui/icons-material/Expand';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AdjustIcon from '@mui/icons-material/Adjust';
import LabelIcon from '@mui/icons-material/Label';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useCallback, useEffect, useState } from 'react';

export default function SolarSystem({
  planets,
  sunColor,
  sunShadowColor,
  scale,
  size,
  sunSize,
  shadowSize,
  setScale,
  displayOrbit,
  setDisplayOrbit,
  displayName,
  setDisplayName,
  setdisplayHeader,
  defaultScale,
  elementSelected,
  setElementSelected,
  disableButtons,
  basePlanet,
}) {
  // const handleUserKeyPress = useCallback((event) => {
  //   setScale((prev) => {
  //     if (event.deltaY > 0) {
  //       return prev + 0.05;
  //     } else {
  //       return prev - 0.05;
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('wheel', handleUserKeyPress);
  //   return () => {
  //     window.removeEventListener('wheel', handleUserKeyPress);
  //   };
  // }, [handleUserKeyPress]);

  const handleClose = () => {
    setScale((prev) => {
      if (prev === defaultScale) {
        setdisplayHeader(false);
        return 0.8;
      } else {
        setdisplayHeader(true);
        return defaultScale;
      }
    });
  };

  const zoom = (value) => {
    setScale((prev) => {
      if (value === 'in') {
        return prev + 0.05;
      } else {
        return prev - 0.05;
      }
    });
  };

  const handleDisplayOrbit = () => {
    setDisplayOrbit((prev) => !prev);
  };

  const selectItem = (element) => {
    setElementSelected(element);
  };

  const handleDisplayName = () => {
    setDisplayName((prev) => !prev);
  };

  return (
    <div style={{ height: `${size * scale}px`, width: `100%`, overflow: 'auto', margin: 'auto', position: 'relative' }}>
      <div className='solar-system' style={{ height: `${size * scale}px`, width: `100%` }}>
        <div
          id='sun'
          style={{
            height: `${sunSize * scale}px`,
            width: `${sunSize * scale}px`,
            marginTop: `-${(sunSize * scale) / 2}px`,
            marginLeft: `-${(sunSize * scale) / 2}px`,
            backgroundColor: `${sunColor}`,
            boxShadow: shadowSize ? `0 0 ${shadowSize}px ${sunShadowColor}` : `0 0 ${(sunSize * scale) / 2}px ${sunShadowColor}`,
            borderRadius: `50%`,
          }}
        />

        {planets.map((planet, index) => (
          <PlanetOrbit
            key={planet.id}
            scale={scale}
            planet={planet}
            selectedItem={elementSelected}
            displayOrbit={displayOrbit}
            displayName={displayName}
            index={index}
            basePlanet={basePlanet}
          />
        ))}
        <div>
          <Stack direction='row' spacing={1}>
            {planets.map((planet, index) => (
              <PlanetButton
                key={planet.id}
                scale={scale}
                planet={planet}
                selectedItem={elementSelected}
                displayOrbit={displayOrbit}
                displayName={displayName}
                index={index}
                selectItem={selectItem}
                basePlanet={basePlanet}
              />
            ))}

            {!disableButtons && (
              <>
                <IconButton onClick={() => zoom('in')} style={{ marginLeft: 'auto' }}>
                  <ZoomInIcon />
                </IconButton>
                <IconButton onClick={() => zoom('out')}>
                  <ZoomOutIcon />
                </IconButton>
                <IconButton onClick={handleDisplayName}>
                  <LabelIcon />
                </IconButton>
                <IconButton onClick={handleDisplayOrbit}>
                  <AdjustIcon />
                </IconButton>
                <IconButton onClick={handleClose}>
                  <FullscreenIcon />
                </IconButton>
              </>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
}
