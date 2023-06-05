import PlanetOrbit from './PlanetOrbit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';

export default function SolarSystem({ planets, sunColor, sunShadowColor, scale, size, sunSize, shadowSize, setScale }) {
  const handleClose = () => {
    setScale((prev) => {
      if (prev < 0.5) {
        return 0.8;
      } else {
        return 0.3;
      }
    });
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

        {planets.map((planet) => (
          <PlanetOrbit key={planet.id} scale={scale} planet={planet} />
        ))}
        <div style={{ right: 0, bottom: 0 }}>
          <IconButton onClick={handleClose}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
