import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Overview from '../pages/Overview';
import Ressources from '../pages/Ressources';
import Storage from '../pages/Storage';
import Facilities from '../pages/Facilities';
import Research from '../pages/Research';
import Defence from '../pages/Defence';
import Planet from '../pages/Planet';
import Galaxy from '../pages/Galaxy';
import Shipyard from '../pages/Shipyard';
import Missions from '../pages/Missions';
import Trade from '../pages/Trade';
import History from '../pages/History';

const routes = [
  { path: '/', element: <Overview /> },
  { path: '/ressources', element: <Ressources /> },
  { path: '/storage', element: <Storage /> },
  { path: '/facilities', element: <Facilities /> },
  { path: '/research', element: <Research /> },
  { path: '/defence', element: <Defence /> },
  { path: '/planet', element: <Planet /> },
  { path: '/galaxy', element: <Galaxy /> },
  { path: '/shipyard', element: <Shipyard /> },
  { path: '/missions', element: <Missions /> },
  { path: '/trade', element: <Trade /> },
  { path: '/history', element: <History /> },
];

export default function Pages({ menuWidth, infosWidth }) {
  return (
    <Box sx={{ marginLeft: `${menuWidth}px`, marginRight: `${infosWidth}px`, padding: '8px' }}>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </Box>
  );
}
