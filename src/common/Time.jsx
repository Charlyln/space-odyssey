import { Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { socket } from '../utils/socket';

export default function Time() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function onRessourcesEvent(data) {
      setTime(data.time);
    }

    socket.on('ressources', onRessourcesEvent);

    return () => {
      socket.off('ressources', onRessourcesEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '50px', width: '100%' }}>
      <Card style={{ height: '50px', border: 'none', position: 'relative' }} variant='outlined'>
        <div
          style={{
            padding: 0,
            textAlign: 'center',
            position: 'absolute',
            margin: 0,
            top: '50%',
            left: '50%',
            msTransform: 'translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography style={{ fontFamily: 'monospace', fontSize: 'initial' }}>{time}</Typography>
        </div>
      </Card>
    </div>
  );
}
