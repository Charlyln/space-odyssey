import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomButton from '../common/CustomButton';
import { pages } from './Pages';

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
        <CustomButton
          name={userName}
          width={200}
          height={50}
          fontSize={20}
          primary={'#4b5d5d'}
          secondary={'#1edada'}
          textColor={'#121212'}
        />
      </div>
      <Divider style={{ marginTop: '29px' }} />
      <ContainerStyle>
        {pages.map((link) => (
          <Link to={link.path} key={link.path}>
            <CustomButton
              opacity={0.7}
              key={link.path}
              name={link.name}
              width={200}
              height={50}
              fontSize={20}
              primary={'#4b5d5d'}
              secondary={'#1edada'}
              textColor={'#121212'}
            />
          </Link>
        ))}
      </ContainerStyle>
      <Divider style={{ marginTop: '15px' }} />
    </Drawer>
  );
}
