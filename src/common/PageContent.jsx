import { Card, Grid, Typography } from '@mui/material';

export default function PageContent({ children, borderLess, title, bgColor, style, height, border }) {
  return (
    <Grid item xs={12} style={{ height: height || 'unset', border: border && 'solid 1px grey' }}>
      <Card style={{ border: borderLess && 'none', backgroundColor: bgColor, ...style }} variant='outlined'>
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
