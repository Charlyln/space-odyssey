import * as React from 'react';
import clsx from 'clsx';
import { AutoSizer, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material';

const classes = {
  flexContainer: 'virtualized-flexContainer',
  tableRow: 'virtualized-tableRow',
  tableRowHover: 'virtualized-tableRowHover',
  tableCell: 'virtualized-tableCell',
  noClick: 'virtualized-noClick',
  header: 'virtualized-header',
};

const styles = ({ theme }) => ({
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
    borderBottom: 'solid 1px rgba(81, 81, 81, 1)',
    borderLeft: 'solid 1px rgba(81, 81, 81, 1)',
    borderRight: 'solid 1px rgba(81, 81, 81, 1)',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
  },
  [`& .${classes.tableCell}`]: {
    padding: '16px 4px',
    flex: 1,
  },
  [`& .${classes.header}`]: {
    borderTop: 'solid 1px rgba(81, 81, 81, 1)',
    padding: '16px 2px',
  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
});

const ContainerStyle = styled(Table)(() => ({
  '&::-webkit-scrollbar': {
    width: 12,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
    // borderRadius: '10px',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    // borderRadius: '10px',
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
    backgroundColor: '#555',
  },
}));

function VirtualizedTable({
  items,
  columns,
  rowHeight,
  getControler,
  height,
  headerHeight,
  rowGetter,
  rowCount,
  sort,
  sortBy,
  sortDirection,
  ...tableProps
}) {
  const cellRenderer = ({ cellData, columnIndex, rowData, dataKey }) => {
    return (
      <TableCell
        // className={clsx(classes.tableCell, classes.flexContainer, {
        //   [classes.noClick]: onRowClick == null,
        // })}
        variant='body'
        align='left'
      >
        {columns[columnIndex].isControler ? getControler(rowData, dataKey) : cellData}
      </TableCell>
    );
  };

  //   const headerRenderer = ({ label }) => {
  //     return (
  //       <TableCell className={clsx(classes.header)} variant='head'>
  //         {getHeader(label)}
  //       </TableCell>
  //     );
  //   };

  const getRowClassName = ({ index }) => {
    if (index === -1) {
      return clsx(classes.header, classes.tableRow, classes.flexContainer);
    } else {
      return clsx(classes.tableRow, classes.flexContainer, classes.tableRowHover);
    }
  };

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <ContainerStyle
            width={width}
            {...tableProps}
            height={height}
            headerHeight={headerHeight}
            rowHeight={30}
            rowCount={rowCount}
            rowGetter={rowGetter}
            rowClassName={getRowClassName}
          >
            {columns.map((column) => {
              return (
                <Column
                  key={column.dataKey}
                  label={column.label}
                  dataKey={column.dataKey}
                  width={width}
                  cellRenderer={cellRenderer}
                  //   headerRenderer={headerRenderer}
                />
              );
            })}
          </ContainerStyle>
        )}
      </AutoSizer>
    </>
  );
}

const CustomTable = styled(VirtualizedTable)(styles);

export default CustomTable;
