import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';
import { Box, Divider } from '@mui/material';

import { Context } from './utils/AppContext';
import { hostname, port } from './utils/config';

import StatusBar from './layout/StatusBar';
import Menu from './layout/Menu';
import Infos from './layout/Infos';
import Pages from './layout/Pages';

import { socket } from './utils/socket';

const menuWidth = 235;
const infosWidth = 300;

export default function Layout() {
  const { setStore } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onConnect() {
      console.log('Connected');
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    function onFooEvent(value) {
      console.log('receive message', value);
      setStore((prevState) => ({
        ...prevState,
        infos: [value, ...prevState.infos],
      }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('info', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('info', onFooEvent);
    };
  }, []);

  const userId = window.localStorage.getItem('userId');

  useEffect(() => {
    const interval = setInterval(async () => {
      await getUserData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getUserData = async () => {
    try {
      const userData = await axios.get(`http://${hostname}:${port}/v1/users/${userId}`);

      setStore((prevState) => ({
        ...prevState,
        user: userData.data,
        ressources: userData.data.Ressources,
        buildings: userData.data.Buildings,
        socket,
      }));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Box>
        {!loading && (
          <>
            <StatusBar menuWidth={menuWidth} infosWidth={infosWidth} />
            <Divider/>
            <Menu width={menuWidth} />
            <Pages menuWidth={menuWidth} infosWidth={infosWidth} />
            <Infos width={infosWidth} />
          </>
        )}
      </Box>
    </BrowserRouter>
  );
}
