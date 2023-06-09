import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';
import CloseIcon from '@mui/icons-material/Close';

export default function PageHeader({ height, imgWidth, imageName, title, children, elementSelected, setElementSelected, getChild }) {
  return (
    <Grid item xs={12}>
      <Card style={{ display: 'flex', height, position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
        <CardMedia
          component='img'
          sx={{ width: imgWidth || '300px' }}
          image={elementSelected ? getImg(elementSelected.name) : getImg(imageName)}
          alt={title}
        />

        <CardContent style={{ width: '100%', padding: '6px 8px' }}>
          <Typography component='div' variant='h5' style={{ fontFamily: 'monospace' }}>
            {title}
          </Typography>

          {getChild && getChild()}

          {elementSelected && (
            <>
              <div style={{ position: 'absolute', right: '0', top: '0', padding: '15px' }}>
                <IconButton onClick={() => setElementSelected(elementSelected)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Typography variant='subtitle1' color='text.secondary' component='div'>
                {elementSelected.name}
              </Typography>

              {children}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
