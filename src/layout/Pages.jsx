import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Overview from '../pages/Overview';
import Ressources from '../pages/Ressources';
import Planet from '../pages/Planet';
import Research from '../pages/Research';
import Missions from '../pages/Missions';
import Trade from '../pages/Trade';
import Shipyard from '../pages/Shipyard';

export default function Pages({ menuWidth, infosWidth }) {
  return (
    <Box sx={{ marginLeft: `${menuWidth}px`, marginRight: `${infosWidth}px`, padding: '8px' }}>
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/ressources' element={<Ressources />} />
        <Route path='/planet' element={<Planet />} />
        <Route path='/research' element={<Research />} />
        <Route path='/missions' element={<Missions />} />
        <Route path='/trade' element={<Trade />} />
        <Route path='/shipyard' element={<Shipyard />} />
      </Routes>
    </Box>
  );
}
