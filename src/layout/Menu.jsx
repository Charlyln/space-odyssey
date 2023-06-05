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
    to: '/factories',
    name: 'Factories',
  },
  {
    to: '/research',
    name: 'Research',
  },
  {
    to: '/defense',
    name: 'Defense',
  },
  {
    to: '/planet',
    name: 'Planet',
  },
  {
    to: '/galaxy',
    name: 'Galaxy',
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
    to: '/trade',
    name: 'Trade',
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
      <ContainerStyle>
        {links.map((link) => (
          <Link to={link.to} key={link.to}>
            <CustomButton key={link.to} name={link.name} color={location.pathname === link.to ? 185 : 240} />
          </Link>
        ))}
      </ContainerStyle>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
