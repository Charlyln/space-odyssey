import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import ContainerList from '../common/ContainerList';
import TradeList from '../common/TradeList';
import TradeHistoryItem from '../common/TradeHistoryItem';
import { Button, ButtonGroup, CardContent, Stack, Typography } from '@mui/material';
import { fomatNumber } from '../utils/helpers/number.helper';
import CardStack from '../common/CardStack';
import TradeItem from '../common/TradeItem';

function Inventory() {
  const { store } = useContext(Context);
  const { user } = store;
  const [trades, setTrades] = useState(user.Trades);
  const [tradType, setTradType] = useState('Buy');

  const tradeRessources = user.Ressources.filter(
    (ressource) => ressource.name !== 'people' && ressource.name !== 'money' && ressource.name !== 'energy',
  );
  const money = user.Ressources.find((ressource) => ressource.name === 'money');

  const buy = async (element) => {
    try {
      const body = { userId: user.id, type: 'BuyRessource', parameters: element };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);
      if (response.data) {
        setTrades((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTrades = () => {
    try {
      return (
        <>
          <ButtonGroup style={{ position: 'absolute', top: 10, right: 10 }} size='small' variant='outlined'>
            <Button variant={tradType === 'Buy' ? 'contained' : 'outlined'} onClick={() => setTradType('Buy')}>
              Buying
            </Button>
            <Button variant={tradType === 'Sell' ? 'contained' : 'outlined'} onClick={() => setTradType('Sell')}>
              Selling
            </Button>
          </ButtonGroup>
          <ContainerList height={287}>
            <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
              <Typography variant='button' color='text.secondary' component='div'>
                History:
              </Typography>
            </Stack>

            {trades.map((trade) => (
              <TradeHistoryItem key={trade.id} trade={trade} />
            ))}
          </ContainerList>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRessourceValue = (ressourceValue) => {
    try {
      return fomatNumber(ressourceValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getFooter = (element) => {
    return (
      <CardContent style={{ padding: 0, textAlign: 'center', height: '20px', marginTop: '-4px' }}>
        <Typography style={{ fontFamily: 'monospace', fontSize: 12, paddingTop: '2px' }}>{getRessourceValue(element.value)}</Typography>
      </CardContent>
    );
  };

  return (
    <PageContainer>
      <PageHeader
        height={'350px'}
        imgWidth={'400px'}
        imageName={'trade'}
        title={'Galactic Trade'}
        // action={buy}
        // actionName={'buy'}
        getChild={getTrades}
        // displayButton={ressources.length > 0}
      />

      {tradType === 'Buy' ? (
        <PageContent bgColor={'unset'}>
          <TradeList height={500} action={buy} ressources={tradeRessources} money={money.value} />
        </PageContent>
      ) : (
        <>
          <PageContent bgColor={'unset'} borderLess>
            <TradeItem ressource={user.Ressources[0]} action={() => {}} money={money} />
          </PageContent>
          <PageContent bgColor={'unset'}>
            <ContainerList height={300}>
              <div style={{ padding: '2px' }}>
                <CardStack
                  cardSize={'70px'}
                  array={[...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources, ...user.Ressources]}
                  cardGetter={getFooter}
                  disabledCard={true}
                  onSelect={() => {}}
                  square
                />
              </div>
            </ContainerList>
          </PageContent>
        </>
      )}
    </PageContainer>
  );
}

export default Inventory;
