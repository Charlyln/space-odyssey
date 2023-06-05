import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toolbar, Box } from '@mui/material';

import Overview from '../pages/Overview';
import Ressources from '../pages/Ressources';
import Planet from '../pages/Planet';
import Research from '../pages/Research';
import Missions from '../pages/Missions';
import Market from '../pages/Market';

export default function Pages({ menuWidth, infosWidth }) {
  return (
    <Box sx={{ p: 3, marginLeft: `${menuWidth}px`, marginRight: `${infosWidth}px`, marginTop: '20px' }}>
      <Toolbar />
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/ressources' element={<Ressources />} />
        <Route path='/planet' element={<Planet />} />
        <Route path='/research' element={<Research />} />
        <Route path='/missions' element={<Missions />} />
        <Route path='/market' element={<Market />} />
      </Routes>
    </Box>
  );
}
