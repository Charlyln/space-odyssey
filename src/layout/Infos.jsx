import React, { useState, useContext } from 'react';
import { Alert, Drawer, Stack, Collapse, IconButton, Divider } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { History } from '@mui/icons-material';
import { Context } from '../utils/AppContext';

export default function Infos({ width }) {
  const { store, setStore } = useContext(Context);

  const clearInfos = () => {
    setStore((prevState) => ({
      ...prevState,
      infos: [],
    }));
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
          {store.infos.map((info) => (
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
