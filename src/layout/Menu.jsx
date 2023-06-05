import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
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
    to: '/facilities',
    name: 'Facilities',
  },
  {
    to: '/research',
    name: 'Research',
  },
  {
    to: '/defence',
    name: 'Defence',
  },
  {
    to: '/colony',
    name: 'Colony',
  },
  {
    to: '/planet',
    name: 'Planet',
  },
  {
    to: '/galaxy',
    name: 'System',
  },
  {
    to: '/shipyard',
    name: 'Shipyard',
  },
  {
    to: '/missions',
    name: 'Missions',
  },
  {
    to: '/trade',
    name: 'Galactic Trade',
  },
  {
    to: '/history',
    name: 'History',
  },
];

const ContainerStyle = styled(List)(() => ({
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 5,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
    backgroundColor: '#555',
  },
}));

export default function Menu({ width, userName }) {
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
        <CustomButton name={userName} width={200} height={50} fontSize={20} />
      </div>
      <Divider style={{ marginTop: '29px' }} />
      <ContainerStyle>
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            <CustomButton
              key={link.to}
              name={link.name}
              width={200}
              height={50}
              fontSize={20}
              color={location.pathname === link.to ? 185 : 240}
            />
          </Link>
        ))}
      </ContainerStyle>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
