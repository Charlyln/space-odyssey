import React from 'react';
import RessourceItem from './RessourceItem';

export default function RessourcesStack({ ressources, size, square, onClick, footer }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ressources?.map((ressource) => (
        <RessourceItem onClick={onClick} key={ressource.id} ressource={ressource} size={size} square={square} footer={footer} disabled />
      ))}
    </div>
  );
}
