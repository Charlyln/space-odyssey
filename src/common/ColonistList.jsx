import React from 'react';
import ColonistItem from './ColonistItem';
import ContainerList from './ContainerList';

export default function ColonistTable({ colonists, assigments, height }) {
  return (
    <ContainerList height={`calc(${height} - 25px)`}>
      {/* <ColonistItem colonist={colonist} /> */}
      {colonists.map((colonist) => (
        <ColonistItem colonist={colonist} assigments={assigments} />
      ))}
    </ContainerList>
  );
}
