import React from 'react';
import RessourceItem from './RessourceItem';

export default function RessourcesStack({ ressources, size, square, onClick, footer, disabled }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ressources?.map((ressource) => (
        <RessourceItem
          key={ressource.id}
          onClick={onClick}
          ressource={ressource}
          size={size}
          square={square}
          footer={footer}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
