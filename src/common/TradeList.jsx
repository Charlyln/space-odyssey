import React from 'react';
import { List } from '@mui/material';
import { styled } from '@mui/material/styles';
import TradeItem from './TradeItem';

const ContainerStyle = styled(List)(({ height }) => ({
  overflow: 'auto',
  height: height,
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

export default function TradeList({ height, action, ressources, money }) {
  return (
    <ContainerStyle height={height}>
      {ressources.map((ressource) => (
        <TradeItem key={ressource.id} ressource={ressource} action={action} money={money} />
      ))}
    </ContainerStyle>
  );
}
