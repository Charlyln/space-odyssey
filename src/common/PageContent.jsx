import { Card, Grid } from '@mui/material';

export default function PageContent({ children, borderLess }) {
  return (
    <Grid item xs={12} style={{ marginTop: '10px' }}>
      <Card style={{ border: borderLess && 'none' }} variant='outlined'>
        {children}
      </Card>
    </Grid>
  );
}
