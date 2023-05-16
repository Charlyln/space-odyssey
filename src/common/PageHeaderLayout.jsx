import { Grid } from '@mui/material';

export default function PageHeaderLayout({ children }) {
  return (
    <Grid container style={{ marginTop: '10px' }}>
      {children}
    </Grid>
  );
}
