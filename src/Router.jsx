import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppBar, Box } from '@mui/material';

import StatusBar from './layout/StatusBar';
import Menu from './layout/Menu';
import Infos from './layout/Infos';
import Pages from './layout/Pages';

const menuWidth = 235;
const infosWidth = 300;

export default function Router() {
  return (
    <BrowserRouter>
      <Box>
        <StatusBar menuWidth={menuWidth} />
        <Menu width={menuWidth} />
        <Pages menuWidth={menuWidth} infosWidth={infosWidth} />
        <Infos width={infosWidth} />
      </Box>
    </BrowserRouter>
  );
}
