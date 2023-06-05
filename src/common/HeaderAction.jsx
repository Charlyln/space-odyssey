import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function HeaderAction({ children }) {
  return <div style={{ position: 'absolute', right: '0', bottom: '0', padding: '15px', display: 'flex' }}>{children}</div>;
}
