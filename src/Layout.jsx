import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Box, Divider } from '@mui/material';

import { Context } from './utils/AppContext';
import { hostname, port } from './utils/config';
import StatusBar from './layout/StatusBar';
import Menu from './layout/Menu';
import Infos from './layout/Infos';
import Pages from './layout/Pages';
import Login from './pages/Login';

import { socket } from './utils/socket';

const menuWidth = 240;
const infosWidth = 300;

export default function Layout() {
  const { setStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  const localUserId = window.localStorage.getItem('userId');

  const getUserData = async (newUserid) => {
    try {
      const userId = newUserid || localUserId;
      if (userId) {
        const userData = await axios.get(`http://${hostname}:${port}/v1/users/${userId}`);

        if (userData.data.id) {
          socket.emit('register', userData.data.id);
        }

        setStore((prevState) => ({
          ...prevState,
          user: userData.data,
          socket,
        }));

        setLoading(false);
        setRegistered(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getUserData();
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log('Connected');
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    function onInfoEvent(value) {
      setStore((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          Infos: [value, ...prevState.user.Infos],
        },
      }));
    }

    function onUserDataEvent(data) {
      setStore((prevState) => ({
        ...prevState,
        user: data,
      }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('info', onInfoEvent);
    socket.on('userData', onUserDataEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('info', onInfoEvent);
      socket.off('userData', onUserDataEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return 'loading...';

  if (!registered) return <Login getUserData={getUserData} />;

  return (
    <Box>
      <StatusBar menuWidth={menuWidth} infosWidth={infosWidth} />
      <Divider />
      <Menu width={menuWidth} />
      <Pages menuWidth={menuWidth} infosWidth={infosWidth} />
      <Infos width={infosWidth} />
    </Box>
  );
}
