import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function CircularLoading({ hide, progress }) {
  if (hide) {
    return '';
  }

  return (
    <Box sx={{ position: 'absolute', top: '4px', left: '-40px' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: 'grey',
          opacity: 0.2,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        size={45}
        thickness={5}
        value={100}
      />
      <CircularProgress
        variant='determinate'
        sx={{
          color: 'grey',
          position: 'absolute',
          left: 0,
        }}
        size={45}
        thickness={5}
        value={progress}
      />
      <Box
        sx={{
          top: -6,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
}
