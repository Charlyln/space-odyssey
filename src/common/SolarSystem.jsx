import PlanetOrbit from './PlanetOrbit';

export default function SolarSystem({ planets, sunColor, sunShadowColor, scale, size, sunSize }) {
  // const size = 75;
  // const sunSize = 15;

  return (
    <div style={{ height: `${size * scale}px`, width: `${size * scale}px`, overflow: 'auto' }}>
      <div className='solar-system' style={{ height: `${size * scale}px`, width: `${size * scale}px` }}>
        <div
          id='sun'
          style={{
            height: `${sunSize * scale}px`,
            width: `${sunSize * scale}px`,
            marginTop: `-${(sunSize * scale) / 2}px`,
            marginLeft: `-${(sunSize * scale) / 2}px`,
            backgroundColor: `${sunColor}`,
            boxShadow: `0 0 ${(sunSize * scale) / 2}px ${sunShadowColor}`,
            borderRadius: `50%`,
          }}
        />

        {planets.map((planet) => (
          <PlanetOrbit key={planet.id} scale={scale} planet={planet} />
        ))}
      </div>
    </div>
  );
}
