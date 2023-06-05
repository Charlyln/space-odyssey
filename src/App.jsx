import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Router from './Router';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}
