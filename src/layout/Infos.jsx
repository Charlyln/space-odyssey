import React from 'react';
import { Alert, Drawer, Stack } from '@mui/material';

const infos = [
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
];

export default function Infos({ width }) {
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
      <Stack sx={{ width: '100%', padding: '5px' }} spacing={1}>
        {infos.map((info) => (
          <Alert key={info.id} variant='outlined' severity={info.severity}>
            {info.message}
          </Alert>
        ))}
      </Stack>
    </Drawer>
  );
}
