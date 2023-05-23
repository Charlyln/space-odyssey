import React from 'react';
import TradeItem from './TradeItem';
import ContainerList from './ContainerList';

export default function TradeList({ height, action, ressources, money }) {
  return (
    <ContainerList height={height}>
      {ressources.map((ressource) => (
        <TradeItem key={ressource.id} ressource={ressource} action={action} money={money} />
      ))}
    </ContainerList>
  );
}
