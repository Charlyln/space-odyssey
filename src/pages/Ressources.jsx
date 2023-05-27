import React, { useContext } from 'react';
import axios from 'axios';
import { actionTypes, facilitiesStatus } from 'enums';
import { Typography, Stepper, Step, Chip, IconButton } from '@mui/material';
import { Context } from '../utils/AppContext';
import { hostname, port } from '../utils/config';

import PageHeader from '../common/PageHeader';
import PageContainer from '../common/PageContainer';
import CardProgress from '../common/CardProgress';
import useSelectedElement from '../utils/customHooks/useSelectedElement';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PageContent from '../common/PageContent';
import CardStack from '../common/CardStack';
import CustomIcon from '../common/CustomIcon';
import { fomatNumber } from '../utils/helpers/number.helper';
import RessourceChip from '../common/RessourceChip';
import RessourcesStack from '../common/RessourcesStack';
import PageHeaderCosts from '../common/PageHeaderCosts';
import PageHeaderInfos from '../common/PageHeaderInfos';
import ForwardIcon from '@mui/icons-material/Forward';
import Duration from '../common/Duration';

function Ressources() {
  const { store, setStore } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();

  const upgrade = async (item) => {
    try {
      const body = { userId: user.id, type: actionTypes.upgradeBuilding, parameters: { buildingId: item.id } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      setStore((prevState) => {
        const newState = [...prevState.user.Buildings];
        const index = newState.findIndex((building) => building.id === response.data.id);

        if (index !== -1) {
          newState[index] = response.data;

          return {
            ...prevState,
            user: {
              ...prevState.user,
              Buildings: newState,
            },
          };
        }
      });
    } catch (error) {
      // setdisabledAction(false);
      console.log(error);
    }
  };

  const cancel = async (item) => {
    try {
      const body = { userId: user.id, type: actionTypes.cancelBuilding, parameters: { buildingId: item.id } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      if (response.data) {
        setStore((prevState) => {
          const newState = [...prevState.user.Buildings];
          const index = newState.findIndex((building) => building.id === response.data.id);
          if (index !== -1) {
            newState[index] = response.data;
            return {
              ...prevState,
              user: {
                ...prevState.user,
                Buildings: newState,
              },
            };
          }
        });
      }
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
          value: `${fomatNumber(element.output)} / Hour`,
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

  const getFooter = (element) => {
    return (
      <div style={{ height: '20px', textAlign: element.status === facilitiesStatus.waiting && 'center' }}>
        {element.progress !== 0 ? (
          <CardProgress progress={element.progress} height={20} />
        ) : element.status === facilitiesStatus.waiting ? (
          <>
            <ScheduleIcon style={{ color: 'orange', width: '20px', height: '20px' }} />
          </>
        ) : (
          <>
            <CustomIcon size={20} icon={element.production} />

            {element.status === facilitiesStatus.waiting && <ScheduleIcon style={{ color: 'orange', width: '20px', height: '20px' }} />}
            <Typography sx={{ fontSize: 14, float: 'right', marginRight: '5px', fontFamily: 'monospace' }} color='text.secondary'>
              {`${element.level}`}
            </Typography>
          </>
        )}
      </div>
    );
  };

  const find = user.Buildings.find((building) => building.id === elementSelected?.id);

  console.log(elementSelected);

  return (
    <PageContainer>
      <PageHeader
        height={'250px'}
        imgWidth={'250px'}
        imageName={'ressources'}
        title={'Ressources'}
        elementSelected={elementSelected}
        setElementSelected={setElementSelected}
        action={upgrade}
        actionName={'Upgrade'}
        costs={user.Costs}
        headerInfosTitle={`Infos:`}
        getInfos={getInfos}
        disabledAction={find?.status === facilitiesStatus.setup}
        enableCancelAction={find?.status === facilitiesStatus.waiting}
        cancelAction={cancel}
        cancelActionName={'cancel'}
        displayButton={elementSelected}
      >
        <Stepper>
          <Step>
            <Typography variant='button' color='text.secondary' component='div'>
              {`Level ${elementSelected?.level}`}
            </Typography>

            <RessourceChip type={'produce'} ressource={elementSelected?.production} value={elementSelected?.output} />
            <RessourceChip type={'consume'} ressource={elementSelected?.production} value={elementSelected?.duration} />
          </Step>

          <Step>
            <PageHeaderCosts costs={user.Costs} element={elementSelected} />
            <Duration size='small' label={'Upgrade'} duration={elementSelected?.duration} />
          </Step>

          <Step>
            <Typography variant='button' color='text.secondary' component='div'>
              {`Level ${elementSelected?.level + 1}`}
            </Typography>
            <div>
              <RessourceChip type={'produce'} ressource={elementSelected?.production * 2} value={elementSelected?.output * 2} />
              <RessourceChip type={'consume'} ressource={elementSelected?.production * 2} value={elementSelected?.duration * 2} />
            </div>
            {/* <PageHeaderCosts costs={user.Costs} element={elementSelected} /> */}
          </Step>
          {/* <Step>
            <PageHeaderCosts costs={user.Costs} element={elementSelected} />
          </Step> */}
        </Stepper>
        {/* <PageHeaderInfos title={`Level ${elementSelected?.level}`}>
            <RessourceChip type={'produce'} ressource={elementSelected?.production} value={elementSelected?.output} />
            <RessourceChip type={'consume'} ressource={elementSelected?.production} value={elementSelected?.duration} />
          </PageHeaderInfos> */}
        {/* <PageHeaderLayout>
        </PageHeaderLayout> */}
      </PageHeader>

      <PageContent borderLess>
        <CardStack cardSize={'150px'} array={user.Buildings} onSelect={setElementSelected} cardGetter={getFooter} />
      </PageContent>
    </PageContainer>
  );
}

export default Ressources;
