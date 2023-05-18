import React from 'react';
import moment from 'moment';
import { Button, Card, Stack, Typography } from '@mui/material';
import { getImg } from '../utils/helper';
import { fomatNumber } from '../utils/helpers/number.helper';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function TradeHistoryItem({ trade }) {
  return (
    <Card
      variant='outlined'
      style={{
        padding: '5px 5px',
        margin: '5px 0',
        backgroundColor: 'unset',
        border: trade.status === 'success' ? '1px solid rgb(129, 199, 132)' : '1px solid rgb(229, 115, 115)',
      }}
    >
      <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
        {trade.status === 'success' ? (
          <TaskAltIcon style={{ color: 'rgb(129, 199, 132)' }} />
        ) : (
          <ErrorOutlineIcon style={{ color: 'rgb(229, 115, 115)' }} />
        )}

        <span style={{ opacity: '0.3' }}>{`${moment(trade.createdAt).format('D MMM YYYY HH:mm')} - `}</span>

        <img style={{ width: '25px', height: '25px' }} src={getImg(trade.ressource)} alt={trade.ressource} />
        <Typography style={{ fontFamily: 'monospace', width: '20%' }}>{`${trade.ressource}`}</Typography>

        <div style={{ marginLeft: 'auto' }}>
          <Button style={{ width: '100px', color: 'white' }} disabled size='small' variant='outlined'>
            {trade.quantity}
          </Button>
        </div>

        <div style={{ height: '30px' }}>
          <Card variant='outlined' style={{ padding: '2px 5px', height: '30px', width: '120px', display: 'flex' }}>
            <img style={{ width: '50px', height: '50px', marginTop: '-12px', marginLeft: '-15px' }} src={getImg('money')} alt={'money'} />
            <Typography variant='button' style={{ fontFamily: 'monospace', marginLeft: 'auto' }}>
              {fomatNumber(trade.price)}
            </Typography>
          </Card>
        </div>

        {trade.type === 'purchase' ? <ShoppingCartIcon style={{ color: 'grey' }} /> : <LoyaltyIcon style={{ color: 'grey' }} />}
      </Stack>
    </Card>
  );
}
