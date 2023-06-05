import React, { useContext } from 'react';

import { Context } from '../utils/AppContext';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { colors } from '../utils/constants';

const data = [
  {
    name: 'Page A',
    consumption: 4000,
    production: 2400,
  },
  {
    name: 'Page B',
    consumption: 3000,
    production: 1398,
  },
  {
    name: 'Page C',
    consumption: 2000,
    production: 19800,
  },
  {
    name: 'Page D',
    consumption: 2780,
    production: 3908,
  },
  {
    name: 'Page E',
    consumption: 1890,
    production: 4800,
  },
  {
    name: 'Page F',
    consumption: 2390,
    production: 3800,
  },
  {
    name: 'Page G',
    consumption: 3490,
    production: 4300,
  },
];

function Production() {
  const { store, setStore } = useContext(Context);
  const { user } = store;

  console.log(user.Ressources);

  return (
    <PageContainer>
      <PageHeader height={'150px'} imgWidth={'400px'} imageName={'production'} title={'Production'} />

      <BarChart width={600} height={300} data={data} layout='vertical' margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis type='number' />
        <YAxis type='category' dataKey='name' />
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <Legend />
        <Bar dataKey='production' fill={colors.green.primary} />
        <Bar dataKey='consumption' fill={colors.red.primary} />
      </BarChart>

      {/* <BarChart width={730} height={250} data={data} maxBarSize={100}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='uv' fill='#82ca9d' />
        <Bar dataKey='pv' fill='#8884d8' />
      </BarChart> */}
    </PageContainer>
  );
}

export default Production;
