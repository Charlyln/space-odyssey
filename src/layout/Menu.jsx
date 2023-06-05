import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, Divider } from '@mui/material';

import CustomButton from '../common/CustomButton';

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
    to: '/storage',
    name: 'Storage',
  },
  {
    to: '/factories',
    name: 'Factories',
  },
  {
    to: '/research',
    name: 'Research',
  },
  {
    to: '/planet',
    name: 'Planet',
  },
  {
    to: '/spaceships',
    name: 'Spaceships',
  },
  {
    to: '/missions',
    name: 'Missions',
  },
  {
    to: '/market',
    name: 'Market',
  },
];

export default function Menu({ width }) {
  let location = useLocation();

  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <div>
        <CustomButton name={'Charly'} />
      </div>
      <Divider style={{ marginTop: '29px' }} />
      <List>
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            <CustomButton key={link.to} name={link.name} color={location.pathname === link.to ? 185 : 240} />
          </Link>
        ))}
      </List>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
