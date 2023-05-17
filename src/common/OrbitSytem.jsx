import PlanetOrbit from './PlanetOrbit';

export default function OrbitSytem({ planets, select }) {
  return (
    <div style={{ height: '600px', overflow: 'auto' }}>
      <div className='solar-system'>
        <div id='sun'></div>

        {planets.map((planet) => (
          <PlanetOrbit
            onClick={() => select(planet)}
            size={planet.size}
            orbit={planet.orbit}
            speed={planet.speed}
            name={planet.name}
            color={planet.color}
            key={planet.name}
          />
        ))}
      </div>
    </div>
  );
}
