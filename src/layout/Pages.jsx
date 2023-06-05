import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Overview from '../pages/Overview';
import Ressources from '../pages/Ressources';
import Storage from '../pages/Storage';
import Facilities from '../pages/Facilities';
import Research from '../pages/Research';
import Defence from '../pages/Defence';
import Colony from '../pages/Colony';
import Planet from '../pages/Planet';
import StartSystem from '../pages/StartSystem';
import Galaxy from '../pages/Galaxy';
import Univers from '../pages/Univers';
import Shipyard from '../pages/Shipyard';
import Missions from '../pages/Missions';
import Inventory from '../pages/Inventory';
import Craft from '../pages/Craft';
import Trade from '../pages/Trade';
import History from '../pages/History';
import Production from '../pages/Production';
import Automation from '../pages/Automation';

export const pages = [
  { path: '/', element: <Overview />, name: 'Overview' },
  { path: '/ressources', element: <Ressources />, name: 'Ressources' },
  { path: '/production', element: <Production />, name: 'Production' },
  { path: '/automation', element: <Automation />, name: 'Automation' },
  { path: '/facilities', element: <Facilities />, name: 'Facilities' },
  { path: '/defence', element: <Defence />, name: 'Defence' },
  { path: '/colony', element: <Colony />, name: 'Colony' },
  { path: '/shipyard', element: <Shipyard />, name: 'Shipyard' },
  { path: '/missions', element: <Missions />, name: 'Missions' },
  { path: '/planet', element: <Planet />, name: 'Planet' },
  { path: '/startSystem', element: <StartSystem />, name: 'Start System' },
  { path: '/galaxy', element: <Galaxy />, name: 'Galaxy' },
  { path: '/univers', element: <Univers />, name: 'Univers' },
  { path: '/craft', element: <Craft />, name: 'Refining' },
  { path: '/inventory', element: <Inventory />, name: 'Inventory' },
  { path: '/storage', element: <Storage />, name: 'Storage' },
  { path: '/trade', element: <Trade />, name: 'Trade' },
  { path: '/research', element: <Research />, name: 'Research' },
  { path: '/history', element: <History />, name: 'History' },
];

export default function Pages({ menuWidth, infosWidth }) {
  return (
    <Box sx={{ marginLeft: `${menuWidth}px`, marginRight: `${infosWidth}px`, padding: '8px' }}>
      <Routes>
        {pages.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Box>
  );
}
