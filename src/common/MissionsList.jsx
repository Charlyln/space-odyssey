import React from 'react';

import { Typography } from '@mui/material';
import LaunchMissionItem from '../common/LaunchMissionItem';
import OngoingMissionItem from '../common/OngoingMissionItem';
import MissionItem from './MissionItem';

function MissionsList({ type, missions, launchMission, elementSelected, setElementSelected, planets, planet }) {
  const launchMissions = missions.filter((mission) => !mission.ongoing);
  const ongoingMissions = missions.filter((mission) => mission.ongoing);
  const finishMissions = missions.filter((mission) => !mission.ongoing && mission.progress >= 100);

  return (
    <>
      {type === 'ongoing' ? (
        <>
          {ongoingMissions.length === 0 ? (
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {`No Onging Missions`}
            </Typography>
          ) : (
            <>
              {ongoingMissions.map((mission, index) => (
                <OngoingMissionItem
                  key={mission.id}
                  mission={mission}
                  action={launchMission}
                  setElementSelected={setElementSelected}
                  elementSelected={elementSelected}
                  planets={planets}
                  planet={planet}
                  index={index}
                />
              ))}
            </>
          )}
        </>
      ) : type === 'launch' ? (
        <>
          {launchMissions.map((mission, index) => (
            <LaunchMissionItem
              key={mission.id}
              mission={mission}
              action={launchMission}
              setElementSelected={setElementSelected}
              elementSelected={elementSelected}
              planets={planets}
              index={index}
            />
          ))}
        </>
      ) : (
        <>
          {finishMissions.length === 0 ? (
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              No Finish Missions
            </Typography>
          ) : (
            <>
              {finishMissions.map((mission, index) => (
                <MissionItem
                  key={mission.id}
                  mission={mission}
                  action={launchMission}
                  setElementSelected={setElementSelected}
                  elementSelected={elementSelected}
                  planets={planets}
                  index={index}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}

export default MissionsList;
