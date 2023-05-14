import React from 'react';
import { Link } from 'react-router-dom';
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
    to: '/research',
    name: 'Research',
  },
  {
    to: '/planet',
    name: 'Planet',
  },
  {
    to: '/missions',
    name: 'Missions',
  },
];

export default function Menu({ width }) {
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
      <Divider style={{ marginTop: '30px' }} />
      <List>
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            <CustomButton key={link.to} name={link.name} color={240} />
          </Link>
        ))}
      </List>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
