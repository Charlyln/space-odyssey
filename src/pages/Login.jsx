import React, { useState } from 'react';
import { TextField } from '@mui/material';
import './App.css';
import CustomButton from '../common/CustomButton';

import { styled } from '@mui/material/styles';
import axios from 'axios';
import { hostname, port } from '../utils/config';

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

  const register = async () => {
    try {
      window.localStorage.setItem('userId', '');
      const user = await axios.post(`http://${hostname}:${port}/v1/users`, { name });
      window.localStorage.setItem('userId', user.data.id);
      await getUserData(user.data.id);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <svg viewBox='0 0 160 160' width='160' height='160' className='App-logo'>
          <circle cx='80' cy='80' r='50' fill='#2c5edb' />
          <g transform=' matrix(0.866, -0.5, 0.25, 0.433, 80, 80)'>
            <path d='M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z' fill='grey'>
              <animateTransform attributeName='transform' type='rotate' from='360 0 0' to='0 0 0' dur='1s' repeatCount='indefinite' />
            </path>
          </g>
          <path d='M 50,0 A 50,50 0 0,0 -50,0Z' transform='matrix(0.866, -0.5, 0.5, 0.866, 80, 80)' fill='#2c5edb' />
        </svg>
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
        <CustomButton name={'Start'} onClick={register} width={200} height={50} fontSize={20} />
      </header>
    </div>
  );
}

export default Login;
