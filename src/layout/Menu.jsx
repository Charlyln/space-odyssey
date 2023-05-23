import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Divider } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { pages } from './Pages';
import ContainerList from '../common/ContainerList';

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
        <CustomButton label={userName} color={'darkGrey'} size={'large'} textColor={'white'} />
      </div>
      <Divider style={{ marginTop: '29px' }} />
      <ContainerList>
        {pages.map((link) => (
          <Link to={link.path} key={link.path}>
            <CustomButton
              opacity={0.8}
              label={link.name}
              key={link.path}
              color={location.pathname === link.path ? 'darkGrey' : 'lightGrey'}
              size={'large'}
            />
          </Link>
        ))}
      </ContainerList>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
