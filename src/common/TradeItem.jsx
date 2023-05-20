import { Button, ButtonGroup, Card, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePress } from 'react-aria';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CustomButton from './CustomButton';
import { fomatNumber } from '../utils/helpers/number.helper';
import CustomIcon from './CustomIcon';

export default function TradeItem({ ressource, action, money }) {
  const [counter, setCounter] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [moins, setMoins] = useState(false);

  let { pressProps } = usePress({
    onPressStart: (e) => {
      if (e.target.value === 'moins') {
        setMoins(true);
        setCounter((prev) => {
          if (prev >= 0) {
            if (prev <= 2) {
              return 0;
            } else if (prev <= 10) {
              return prev - 1;
            } else if (prev <= 100) {
              return prev - 10;
            } else if (prev <= 1000) {
              return prev - 100;
            } else if (prev <= 10000) {
              return prev - 1000;
            } else if (prev <= 100000) {
              return prev - 10000;
            } else {
              return prev - 1;
            }
          } else {
            return 0;
          }
        });
      } else {
        setPressed(true);
        setCounter((prev) => {
          let newValue;

          newValue = prev + 1;

          if (newValue * ressource.price <= money) {
            return newValue;
          } else {
            return prev;
          }
        });
      }
    },
    onPressEnd: (e) => {
      if (e.target.value === 'moins') {
        setMoins(false);
      } else {
        setPressed(false);
      }
    },
  });

  useEffect(() => {
    if (pressed) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          let newValue;

          if (prev <= 10) {
            newValue = prev + 1;
          } else if (prev <= 100) {
            newValue = prev + 10;
          } else if (prev <= 1000) {
            newValue = prev + 100;
          } else {
            newValue = prev + 1000;
          }

          if (newValue * ressource.price < money) {
            return newValue;
          } else {
            return prev;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [pressed, money, ressource.price]);

  useEffect(() => {
    if (moins) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev >= 0) {
            if (prev <= 1) {
              return 0;
            } else if (prev <= 10) {
              return prev - 1;
            } else if (prev <= 100) {
              return prev - 10;
            } else if (prev <= 1000) {
              return prev - 100;
            } else if (prev <= 10000) {
              return prev - 1000;
            } else if (prev <= 100000) {
              return prev - 10000;
            } else {
              return prev - 1;
            }
          } else {
            return 0;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [moins]);

  const price = counter * ressource.price;

  const sendAction = () => {
    action({ id: ressource.id, quantity: counter, price, name: ressource.name });
    setCounter(0);
  };

  return (
    <Card variant='outlined' style={{ padding: '5px 5px', margin: '5px 0', backgroundColor: 'unset' }}>
      <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
        <CustomIcon size={25} icon={ressource.name} />

        <Typography style={{ fontFamily: 'monospace', width: '20%' }}>{`${ressource.name}`}</Typography>

        <div style={{ height: '30px' }}>
          <Card variant='outlined' style={{ padding: '2px 5px', height: '30px', width: '120px', display: 'flex' }}>
            <CustomIcon size={50} icon={'money'} style={{ marginTop: '-12px', marginLeft: '-15px' }} />

            <Typography variant='button' style={{ fontFamily: 'monospace', marginLeft: 'auto' }}>
              {`${fomatNumber(ressource.price)}`}
            </Typography>
          </Card>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <ButtonGroup size='small' variant='outlined' style={{ height: '30px' }}>
            <Button {...pressProps} value='moins'>
              <ArrowDropDownIcon />
            </Button>
            <Button style={{ width: '100px', color: 'white' }} {...pressProps} disabled>
              {counter}
            </Button>
            <Button {...pressProps} value='plus'>
              <ArrowDropUpIcon />
            </Button>
          </ButtonGroup>
        </div>

        <div style={{ height: '30px' }}>
          <Card variant='outlined' style={{ padding: '2px 5px', height: '30px', width: '120px', display: 'flex' }}>
            <CustomIcon size={50} icon={'money'} style={{ marginTop: '-12px', marginLeft: '-15px' }} />
            <Typography variant='button' style={{ fontFamily: 'monospace', marginLeft: 'auto' }}>
              {price > 0 ? fomatNumber(price) : '-'}
            </Typography>
          </Card>
        </div>

        <CustomButton
          onClick={sendAction}
          label={'buy'}
          color={'green'}
          size={'small'}
          style={{ marginRight: '10px', marginLeft: 'auto' }}
        />
      </Stack>
    </Card>
  );
}
