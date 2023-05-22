import React, { useContext, useState } from 'react';
import axios from 'axios';
import { actionTypes } from 'enums';

import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import ContainerList from '../common/ContainerList';
import TradeList from '../common/TradeList';
import TradeHistoryItem from '../common/TradeHistoryItem';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import RessourcesStack from '../common/RessourcesStack';
import TradeItem from '../common/TradeItem';
import CustomButtonGroup from '../common/CustomButtonGroup';

const header = '250px';
const buttonsHeight = '54px';
const itemHeight = '62px';

const body = `calc(100vh - (110px + ${header} + ${buttonsHeight}))`;

function Inventory() {
  const { store } = useContext(Context);
  const { user } = store;
  const [trades, setTrades] = useState(user.Trades);
  const [tradType, setTradType] = useState('buying');

  console.log(user.Ressources);

  const tradeRessources = user.Ressources.filter(
    (ressource) => ressource.name !== 'people' && ressource.name !== 'money' && ressource.name !== 'energy',
  );
  const money = user.Ressources.find((ressource) => ressource.name === 'money');

  const buy = async (element) => {
    try {
      const body = { userId: user.id, type: actionTypes.buyRessource, parameters: element };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);
      if (response.data) {
        setTrades((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = [
    {
      label: 'buying',
      value: 'buying',
      selected: tradType === 'buying',
      invisible: true,
    },
    {
      label: 'selling',
      value: 'selling',
      selected: tradType === 'selling',
      invisible: true,
    },
  ];

  const getButtons = () => {
    try {
      return (
        <Stack direction='row' alignItems='center' style={{ paddingTop: '8px' }}>
          <CustomButtonGroup value={tradType} buttons={buttons} onChange={setTradType} style={{ marginLeft: 'auto' }} />
        </Stack>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTrades = () => {
    try {
      return (
        <>
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

  return (
    <PageContainer>
      <PageHeader
        height={header}
        imgWidth={'400px'}
        imageName={'trade'}
        title={'Galactic Trade'}
        // action={buy}
        // actionName={'buy'}
        getChild={getTrades}
      />
      <PageContent height={buttonsHeight} borderLess>
        {getButtons()}
      </PageContent>

      {tradType === 'buying' ? (
        <PageContent height={body} bgColor={'unset'}>
          <TradeList height={body} action={buy} ressources={tradeRessources} money={money.value} />
        </PageContent>
      ) : (
        <>
          <PageContent height={itemHeight} bgColor={'unset'} borderLess>
            <TradeItem height={itemHeight} ressource={user.Ressources[0]} action={() => {}} money={money} />
          </PageContent>

          <PageContent bgColor={'unset'} height={`calc(${body} - ${itemHeight})`}>
            <ContainerList height={`calc(${body} - ${itemHeight})`}>
              <div style={{ padding: '2px' }}>
                <RessourcesStack size={'70px'} ressources={user.Ressources} disabledCard={true} onClick={() => {}} square footer />
              </div>
            </ContainerList>
          </PageContent>
        </>
      )}
    </PageContainer>
  );
}

export default Inventory;
