import React, { useContext } from 'react';
import axios from 'axios';
import { actionTypes, facilitiesStatus } from 'enums';
import { Typography } from '@mui/material';
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
import { convertMsToTime } from '../utils/helpers/number.helper';
import Duration from '../common/Duration';

function Ressources() {
  const { store, setStore } = useContext(Context);
  const { user } = store;
  const [elementSelected, setElementSelected] = useSelectedElement();

  const upgrade = async (item) => {
    try {
      const body = { userId: user.id, type: actionTypes.upgradeBuilding, parameters: { buildingId: item.id } };
      const response = await axios.post(`http://${hostname}:${port}/v1/actions`, body);

      console.log(response.data);

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
          value: `${element.output} / Hour`,
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

  return (
    <PageContainer>
      <PageHeader
        height={'250px'}
        imgWidth={'300px'}
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
        <Duration label={'Upgrade:'} duration={elementSelected?.duration} />
      </PageHeader>

      <PageContent borderLess>
        <CardStack cardSize={'150px'} array={user.Buildings} onSelect={setElementSelected} cardGetter={getFooter} />
      </PageContent>
    </PageContainer>
  );
}

export default Ressources;
