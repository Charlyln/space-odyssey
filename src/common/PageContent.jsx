import { Card, Grid, Typography } from '@mui/material';

export default function PageContent({ children, borderLess, title }) {
  return (
    <Grid item xs={12} style={{ marginTop: '10px' }}>
      <Card style={{ border: borderLess && 'none' }} variant='outlined'>
        {title && (
          <Typography sx={{ fontSize: 14, marginTop: '20px' }} color='text.secondary'>
            {title}
          </Typography>
        )}
        {children}
      </Card>
    </Grid>
  );
}
