import React, { useState } from 'react';
import { Alert, Drawer, Stack, Collapse, IconButton, Divider } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { History } from '@mui/icons-material';

export default function Infos({ width }) {
  const [infos, setInfos] = useState([
    {
      id: '1',
      message: 'Info alert',
      severity: 'info',
    },
    {
      id: '2',
      message: 'Success alert',
      severity: 'success',
    },
  ]);

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
      <Stack sx={{ width: '100%', padding: '5px' }}>
        <TransitionGroup>
          {infos.map((info) => (
            <Collapse key={info.id}>
              <Alert style={{ margin: '2px 0' }} key={info.id} variant='outlined' severity={info.severity}>
                {info.message}
              </Alert>
            </Collapse>
          ))}
        </TransitionGroup>
      </Stack>
    </Drawer>
  );
}
