import React, { useContext } from 'react';
import { Alert, Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import moment from 'moment';
import { Context } from '../utils/AppContext';
import { styled } from '@mui/material/styles';

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

function InfosList({ height }) {
  const { store } = useContext(Context);

  return (
    <ContainerStyle height={height}>
      <TransitionGroup >
        {store.user.Infos.map((info) => (
          <Collapse key={info.id}>
            <Alert
              style={{ margin: '2px 0', padding: '0px 5px', fontFamily: 'monospace' }}
              key={info.id}
              variant='outlined'
              severity={info.severity}
            >
              <span style={{ opacity: '0.3' }}>{`${moment(info.createdAt).format('D MMM YYYY HH:mm')} - `}</span>
              {`${info.message}`}
            </Alert>
          </Collapse>
        ))}
      </TransitionGroup>
    </ContainerStyle>
  );
}

export default InfosList;
