import { missionStatus } from 'enums/status';
import React from 'react';
import MissionItem from './MissionItem';

function MissionsList({ missions, launchMission, retreiveMission, comeBackMission, elementSelected, setElementSelected, planets, planet }) {
  const finishMissions = missions.filter((mission) => mission.status === missionStatus.finish);
  const notfinishMissions = missions.filter((mission) => mission.status !== missionStatus.finish);
  const orderMissions = [...finishMissions, ...notfinishMissions];

  return (
    <>
      {orderMissions.map((mission, index) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          launchMission={launchMission}
          retreiveMission={retreiveMission}
          comeBackMission={comeBackMission}
          setElementSelected={setElementSelected}
          elementSelected={elementSelected}
          planets={planets}
          planet={planet}
          index={index}
        />
      ))}
    </>
  );
}

export default MissionsList;
