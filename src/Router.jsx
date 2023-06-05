import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import StatusBar from './pages/StatusBar';
import CustomButton from './common/CustomButton';
import { Link } from 'react-router-dom';

import Overview from './pages/Overview';
import Ressources from './pages/Ressources';
import Planet from './pages/Planet';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';

const drawerWidth = 235;

const links = [
  {
    to: '/',
    name: 'Overview',
  },
  {
    to: '/ressources',
    name: 'Ressources',
  },
  {
    to: '/planet',
    name: 'Planet',
  },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, background: 'none', boxShadow: 'none' }}>
          <StatusBar />
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Divider style={{ marginTop: '96px' }} />
          <List>
            {links.map((link) => (
              <Link to={link.to} key={link.to}>
                <CustomButton key={link.to} name={link.name} />
              </Link>
            ))}
          </List>
          <Divider style={{ marginTop: '15px' }} />
        </Drawer>

        <Box component='main' sx={{ p: 3 }}>
          <Toolbar />

          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/ressources' element={<Ressources />} />
            <Route path='/planet' element={<Planet />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
