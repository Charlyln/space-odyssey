import React, { useContext } from 'react';
import axios from 'axios';
import { Card, Typography, Grid, CardMedia, CardActionArea } from '@mui/material';
import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';
import { getImg } from '../utils/helper';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import CardProgress from '../common/CardProgress';
import useSelectedElement from '../utils/customHooks/useSelectedElement';

function Ressources() {
  const { store } = useContext(Context);
  const { user, costs } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();

  const upgrade = async (item) => {
    try {
      const body = { userId: user.id, type: 'UpgradeBuilding', parameters: { buildingId: item.id } };
      await axios.post(`http://${hostname}:${port}/v1/actions`, body);
    } catch (error) {
      console.log(error);
    }
  };

  const getInfos = (element) => {
    try {
      return [
        {
          key: 'Type',
          value: element.production,
        },
        {
          key: 'Production',
          value: '1000 / Hour',
        },
        {
          key: 'Level',
          value: element.level,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        height={'250px'}
        imgWidth={'320px'}
        imageName={'ressources'}
        title={'Ressources'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
        action={upgrade}
        actionName={'Upgrade'}
        costs={costs}
        headerInfosTitle={`Infos`}
        getInfos={getInfos}
      />

      <Grid item xs={12}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {user.Buildings.map((item, i) => (
            <div key={item.name} style={{ paddingRight: '10px' }}>
              <Card style={{ width: '150px', marginTop: '10px' }} variant='outlined' onClick={() => setElementSelected(item)}>
                <CardActionArea>
                  <CardMedia
                    style={{ margin: 'auto', height: '150px', width: '150px' }}
                    component='img'
                    image={getImg(item.name)}
                    alt={item.name}
                  />

                  <div style={{ height: '20px' }}>
                    {item.progress !== 0 ? (
                      <CardProgress variant='determinate' progress={item.progress} height={20} />
                    ) : (
                      <>
                        <img style={{ width: '20px' }} src={getImg(item.production)} alt={item.name} />
                        <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px' }} color='text.secondary'>
                          {item.level}
                        </Typography>
                      </>
                    )}
                  </div>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      </Grid>
    </PageContainer>
  );
}

export default Ressources;
