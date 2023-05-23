import React, { useContext } from 'react';
import { Alert, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import moment from 'moment';
import { Context } from '../utils/AppContext';
import ContainerList from './ContainerList';

function InfosList({ height }) {
  const { store } = useContext(Context);

  return (
    <ContainerList height={height}>
      <TransitionGroup>
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
    </ContainerList>
  );
}

export default InfosList;
