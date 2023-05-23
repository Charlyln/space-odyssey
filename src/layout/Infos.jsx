import React, { useEffect, useState } from 'react';
import { Alert, Drawer, Stack, Collapse, IconButton, Divider } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { History } from '@mui/icons-material';
import { socket } from '../utils/socket';
import Time from '../common/Time';
import ContainerList from '../common/ContainerList';

export default function Infos({ width }) {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    function onInfoEvent(value) {
      setInfos((prevState) => [value, ...prevState]);
    }

    socket.on('info', onInfoEvent);

    return () => {
      socket.off('info', onInfoEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearInfos = () => {
    setInfos([]);
  };

  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='right'
    >
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <Time />
        <IconButton onClick={clearInfos} size='small'>
          <History />
        </IconButton>
      </Stack>

      <Divider />
      <ContainerList>
        <TransitionGroup>
          {infos.map((info) => (
            <Collapse key={info.id}>
              <Alert
                style={{ margin: '2px 0', padding: '0px 3px', fontFamily: 'monospace', fontSize: 12 }}
                key={info.id}
                variant='outlined'
                severity={info.severity}
                // icon={info.severity === 'warning' && <ScheduleIcon />}
              >
                {info.message}
              </Alert>
            </Collapse>
          ))}
        </TransitionGroup>
      </ContainerList>
    </Drawer>
  );
}
