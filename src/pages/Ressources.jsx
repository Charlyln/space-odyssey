import React, { useContext, useState } from 'react';
import { Card, Typography, Grid, CardMedia, CardActionArea } from '@mui/material';
import { Context } from '../utils/AppContext';
import axios from 'axios';
import { hostname, port } from '../utils/config';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import HeaderAction from '../common/HeaderAction';

import ressources from '../assets/ressources/ressources.jpeg';

import { getImg } from '../utils/helper';
import CustomButton from '../common/CustomButton';
import CardProgress from '../common/CardProgress';

function Ressources() {
  const {
    store: { user },
  } = useContext(Context);

  const [elementSelected, setElementSelected] = useState(null);

  const upgrade = async (item) => {
    try {
      const body = { userId: user.id, type: 'UpgradeBuilding', parameters: { buildingId: item.id } };
      await axios.post(`http://${hostname}:${port}/v1/actions`, body);
    } catch (error) {
      console.log(error);
    }
  };

  const selectElement = (element) => {
    try {
      if (elementSelected && elementSelected?.name === element.name) {
        setElementSelected(null);
      } else {
        setElementSelected(element);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        height={'250px'}
        imgWidth={elementSelected ? '320px' : '400px'}
        image={elementSelected ? getImg(elementSelected.name) : ressources}
        imageName={'Ressources'}
        title={'Ressources'}
      >
        {elementSelected && (
          <>
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {elementSelected.name}
            </Typography>
            <Grid container style={{ marginTop: '10px' }}>
              <Grid item xs={4}>
                <Typography variant='button' color='text.secondary' component='div'>
                  infos:
                </Typography>

                <Typography variant='subtitle2' color='text.secondary' component='div'>
                  {`Type: ${elementSelected.production}`}
                </Typography>

                <Typography variant='subtitle2' color='text.secondary' component='div'>
                  {`Production: 1000 / Hour`}
                </Typography>
                <Typography variant='subtitle2' color='text.secondary' component='div'>
                  {`Level: ${elementSelected.level}`}
                </Typography>

                <img
                  style={{ width: '40px', height: '40px', marginTop: '10px' }}
                  src={getImg(elementSelected.production)}
                  alt={elementSelected.production}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='button' color='text.secondary' component='div'>
                  Costs:
                </Typography>
              </Grid>
            </Grid>

            <HeaderAction>
              <CustomButton onClick={() => upgrade(elementSelected)} name={'upgrade'} color={500} width={120} height={40} fontSize={15} />
            </HeaderAction>
          </>
        )}
      </PageHeader>

      <Grid item xs={12}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {user.Buildings.map((item, i) => (
            <div key={item.name} style={{ paddingRight: '10px' }}>
              <Card style={{ width: '150px', marginTop: '10px' }} variant='outlined' onClick={() => selectElement(item)}>
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
