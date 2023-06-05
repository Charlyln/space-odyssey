import { Typography } from '@mui/material';
import React from 'react';
import ColonistItem from './ColonistItem';
import ContainerList from './ContainerList';
import CustomTable from './CustomTable';

const columns = [
  {
    // widthrate: 0.075,
    label: 'Name',
    dataKey: 'name',
  },
];

export default function ColonistTable({ colonists, height }) {
  const getControler = (data, dataKey) => {
    if (dataKey === 'name') {
      return (
        <>
          <Typography> name </Typography>
        </>
      );
    }
  };

  return (
    <CustomTable
      items={colonists}
      columns={columns}
      rowHeight={40}
      rowCount={colonists.length}
      headerHeight={40}
      getControler={getControler}
      // getHeader={getHeader}
      rowGetter={({ index }) => colonists[index]}
      // sort={sort}
      // sortBy={sortBy}
      // sortDirection={sortDirection}
      height={height}
    />
  );
}
