import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

import { Context } from './utils/AppContext';
import { hostname, port } from './utils/config';

import StatusBar from './layout/StatusBar';
import Menu from './layout/Menu';
import Infos from './layout/Infos';
import Pages from './layout/Pages';

const menuWidth = 235;
const infosWidth = 300;

export default function Layout() {
  const { setStore } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const userId = window.localStorage.getItem('userId');

  useEffect(() => {
    async function fetchData() {
      await getUserData();
    }
    fetchData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await axios.get(`http://${hostname}:${port}/v1/users/${userId}`);

      setStore((prevState) => ({
        ...prevState,
        user: userData.data,
        ressources: userData.data.Ressources,
        buildings: userData.data.Buildings,
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
            <StatusBar menuWidth={menuWidth} />
            <Menu width={menuWidth} />
            <Pages menuWidth={menuWidth} infosWidth={infosWidth} />
            <Infos width={infosWidth} />
          </>
        )}
      </Box>
    </BrowserRouter>
  );
}
