import { Grid } from '@mui/material';

export default function PageContainer({ children }) {
  return (
    <Grid container alignItems='center' sx={{ padding: 1 }}>
      {children}
    </Grid>
  );
}
