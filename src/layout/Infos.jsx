import React, { useEffect, useState } from 'react';
import { Alert, Drawer, Stack, Collapse, IconButton, Divider, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { History } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { socket } from '../utils/socket';

const ContainerStyle = styled(List)(() => ({
  overflow: 'auto',
  padding: '6px',
  '&::-webkit-scrollbar': {
    width: 5,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
    backgroundColor: '#555',
  },
}));

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
      <Stack direction='row' justifyContent='flex-end' alignItems='flex-end' spacing={1}>
        <IconButton onClick={clearInfos} size='small'>
          <History />
        </IconButton>
      </Stack>

      <Divider />
      <ContainerStyle>
        <TransitionGroup>
          {infos.map((info) => (
            <Collapse key={info.id}>
              <Alert
                style={{ margin: '2px 0', padding: '0px 5px', fontFamily: 'monospace' }}
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
      </ContainerStyle>
    </Drawer>
  );
}
