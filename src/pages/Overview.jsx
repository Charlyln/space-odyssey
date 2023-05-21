import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import { Context } from '../utils/AppContext';
import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import PageContent from '../common/PageContent';
import InfosList from '../common/InfosList';
import OverviewItem from '../common/OverViewItem';

const header = '150px';
const footer = `200px`;
const body = `calc(100vh - (110px + ${header} + ${footer}))`;

function Overview() {
  const {
    store: { user },
  } = useContext(Context);

  const items = [
    {
      id: 'Buildings',
      name: 'Buildings',
      tasks: user.Buildings.filter((building) => building.upgrading),
    },
    {
      id: 'Research',
      name: 'Research',
      tasks: [],
    },
    {
      id: 'Missions',
      name: 'Missions',
      tasks: user.Missions.filter((mission) => mission.ongoing || mission.status === 'finish' ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader height={header} imgWidth={'300px'} imageName={'overview'} title={'Overview'} />
      <PageContent borderLess height={body}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
          {items.map((item, i) => (
            <OverviewItem height={body} key={item.id} item={item} i={i} />
          ))}
        </Grid>
      </PageContent>
      <PageContent height={footer}>
        <InfosList height={footer} />
      </PageContent>
    </PageContainer>
  );
}

export default Overview;
