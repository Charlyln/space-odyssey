import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import '../common/css/app.css';
import CustomButton from '../common/CustomButton';

import { styled } from '@mui/material/styles';
import axios from 'axios';
import { hostname, port } from '../utils/config';
import CustomIcon from '../common/CustomIcon';
import LandingSpaceShip from '../common/LandingSpaceShip';
import LoadingPlanet from '../common/LoadingPlanet';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  width: '200px',
  marginLeft: '1rem',
  height: '71px',
});

function Login({ getUserData }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [landing, setlanding] = useState(false);
  const [hide, sethide] = useState(false);
  const [redirect, setredirect] = useState(false);

  const register = async () => {
    try {
      setlanding(true);
      window.localStorage.setItem('userId', '');
      const user = await axios.post(`http://${hostname}:${port}/v1/users`, { name });
      window.localStorage.setItem('userId', user.data.id);

      setTimeout(() => {
        sethide(true);
      }, 1000);
    } catch (error) {
      console.log(error);
      setlanding(false);
      setError(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userid = window.localStorage.getItem('userId');
      if (redirect) {
        await getUserData(userid);
      }
    }
    fetchData();
  }, [redirect]);

  if (redirect) {
    return '';
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ position: 'relative' }}>
          <LoadingPlanet landing={landing} />
          <LandingSpaceShip landing={landing} setredirect={setredirect} />
        </div>

        <div style={{ height: '80px', marginTop: '200px' }}>
          {!landing && (
            <CssTextField
              error={error}
              id='name'
              label='Name'
              autoFocus
              variant='standard'
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={error ? 'Name already taken' : ''}
            />
          )}
        </div>

        <div style={{ height: '66px' }}>
          {!hide && (
            <CustomButton
              disabled={landing}
              opacity={landing ? 0.3 : 0.8}
              label={landing ? 'landing...' : 'land'}
              color={'lightGrey'}
              size={'large'}
              onClick={register}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default Login;
