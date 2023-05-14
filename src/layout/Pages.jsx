import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toolbar, Box } from '@mui/material';

import Overview from '../pages/Overview';
import Ressources from '../pages/Ressources';
import Planet from '../pages/Planet';

export default function Pages({ menuWidth, infosWidth }) {
  return (
    <Box sx={{ p: 3, marginLeft: `${menuWidth}px`, marginRight: `${infosWidth}px`, marginTop: '20px' }}>
      <Toolbar />
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/ressources' element={<Ressources />} />
        <Route path='/planet' element={<Planet />} />
      </Routes>
    </Box>
  );
}
