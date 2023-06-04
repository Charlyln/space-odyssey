import React, { useContext } from 'react';

import { Context } from '../utils/AppContext';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';

import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { colors } from '../utils/constants';
import PageBody from '../common/PageBody';
import { Stack } from '@mui/material';

const header = '150px';
const body = `calc(100vh - (110px + ${header}))`;

function Production() {
  const { store } = useContext(Context);
  const { user } = store;

  const data = user.Ressources.map((ressource) => ({
    name: ressource.name,
    consumption: 0,
    production: ressource.production,
  }));

  return (
    <PageContainer>
      <PageHeader height={header} imgWidth={'400px'} imageName={'ressources'} title={'Production'} />

      <PageBody type={'body'} height={body}>
        <Stack direction='row' alignItems='center' justifyContent='center' style={{ height: `calc(${body} - 25px)` }}>
          <BarChart width={800} height={400} data={data} layout='vertical' margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type='number' />
            <YAxis type='category' interval={0} dataKey='name' />
            <Legend />
            <Bar dataKey='production' fill={colors.green.primary} />
            <Bar dataKey='consumption' fill={colors.red.primary} />
          </BarChart>
        </Stack>
      </PageBody>

      {/* <PageContent height={body}>
       
      </PageContent> */}
    </PageContainer>
  );
}

export default Production;
