import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './Layout';
import AppContext from './utils/AppContext';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </AppContext>
    </BrowserRouter>
  );
}
