import React from 'react';
import { List } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerStyle = styled(List)(({ height }) => ({
  overflow: 'auto',
  height: height,
  width: '100%',
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

export default function ContainerList({ height, children }) {
  return <ContainerStyle height={height}>{children}</ContainerStyle>;
}
