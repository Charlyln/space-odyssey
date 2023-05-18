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
import { Typography } from '@mui/material';

function Trade() {
  const { store } = useContext(Context);
  const { user } = store;
  const [trades, setTrades] = useState(user.Trades);

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
        <ContainerList height={287}>
          <Typography variant='button' color='text.secondary' component='div'>
            History:
          </Typography>
          {trades.map((trade) => (
            <TradeHistoryItem trade={trade} />
          ))}
        </ContainerList>
      );
    } catch (error) {
      console.log(error);
    }
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

      <PageContent bgColor={'unset'}>
        <TradeList height={500} action={buy} ressources={tradeRessources} money={money.value} />
      </PageContent>
    </PageContainer>
  );
}

export default Trade;
