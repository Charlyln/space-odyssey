import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { getImg } from '../utils/helper';
import CustomButton from './CustomButton';
import HeaderAction from './HeaderAction';
import PageHeaderCosts from './PageHeaderCosts';
import PageHeaderInfos from './PageHeaderInfos';
import PageHeaderLayout from './PageHeaderLayout';
import CloseIcon from '@mui/icons-material/Close';

export default function PageHeader({
  height,
  imgWidth,
  imageName,
  title,
  children,
  elementSelected,
  setElementSelected,
  action,
  actionName,
  costs,
  headerInfosTitle,
  getInfos,
}) {
  return (
    <Grid item xs={12}>
      <Card style={{ display: 'flex', height, position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
        <CardMedia
          component='img'
          sx={{ width: elementSelected ? imgWidth : '400px' }}
          image={elementSelected ? getImg(elementSelected.name) : getImg(imageName)}
          alt={title}
        />

        <CardContent style={{ width: '100%' }}>
          <Typography component='div' variant='h5'>
            {title}
          </Typography>

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

              <PageHeaderLayout>
                <PageHeaderInfos title={headerInfosTitle} infos={getInfos(elementSelected)} imgParams={elementSelected.production} />
                <PageHeaderCosts costs={costs} elementName={elementSelected.name} />
              </PageHeaderLayout>

              <HeaderAction>
                <CustomButton onClick={() => action(elementSelected)} name={actionName} color={500} width={120} height={40} fontSize={15} />
              </HeaderAction>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}