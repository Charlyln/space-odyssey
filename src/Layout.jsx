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
import { missionStatus } from 'enums/status';


import { socket } from './utils/socket';

const menuWidth = 240;
const infosWidth = 240;

export default function Layout() {
  const { store, setStore } = useContext(Context);
  const { user } = store;
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  const localUserId = window.localStorage.getItem('userId');

  console.log(missionStatus);

  const getUserData = async (newUserid) => {
    try {
      const userId = newUserid || localUserId;
      if (userId) {
        const userData = await axios.get(`http://${hostname}:${port}/v1/users/${userId}`);

        if (userData?.data?.id) {
          socket.emit('register', userData.data.id);
          const serverData = await axios.get(`http://${hostname}:${port}/v1/server`);

          setStore((prevState) => ({
            ...prevState,
            user: userData.data,
            server: serverData.data,
          }));

          setLoading(false);
          setRegistered(true);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
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
      // console.log('Connected');
    }

    function onDisconnect() {
      // console.log('Disconnected');
    }

    function onUserDataEvent(data) {
      setStore((prevState) => ({
        ...prevState,
        user: data,
      }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('userData', onUserDataEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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
      <Menu width={menuWidth} userName={user.name} />
      <Pages menuWidth={menuWidth} infosWidth={infosWidth} />
      <Infos width={infosWidth} />
    </Box>
  );
}
