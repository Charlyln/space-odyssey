import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function PageHeader({ height, imgWidth, image, imageName, title, children }) {
  return (
    <Grid item xs={12}>
      <Card style={{ display: 'flex', height, position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
        <CardMedia component='img' sx={{ width: imgWidth }} image={image} alt={imageName} />

        <CardContent style={{ width: '100%' }}>
          <Typography component='div' variant='h5'>
            {title}
          </Typography>

          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
