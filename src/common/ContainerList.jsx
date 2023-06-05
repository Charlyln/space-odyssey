import React from 'react';
import { List } from '@mui/material';
import { styled } from '@mui/material/styles';
import { containerStyles } from '../utils/constants';

const ContainerStyle = styled(List)(({ height }) => ({
  overflow: 'auto',
  height: height && height,
  width: '100%',
  padding: '6px',
  ...containerStyles,
}));

export default function ContainerList({ height, children }) {
  return <ContainerStyle height={height}>{children}</ContainerStyle>;
}
