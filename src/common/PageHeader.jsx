import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';
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
  disabledAction,
  enableCancelAction,
  cancelAction,
  cancelActionName,
  getChild,
  displayButton,
}) {
  return (
    <Grid item xs={12}>
      <Card style={{ display: 'flex', height, position: 'relative', backgroundColor: 'unset' }} variant='outlined'>
        <CardMedia
          component='img'
          sx={{ width: imgWidth || '400px' }}
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

              {headerInfosTitle && (
                <PageHeaderLayout>
                  <PageHeaderInfos title={headerInfosTitle} infos={getInfos(elementSelected)} imgParams={elementSelected.production} />
                  <PageHeaderCosts costs={costs} elementName={elementSelected.name} />
                </PageHeaderLayout>
              )}

              {children}
            </>
          )}

          {displayButton && actionName && (
            <HeaderAction>
              {enableCancelAction && (
                <CustomButton onClick={() => cancelAction(elementSelected)} label={cancelActionName} color={'green'} size={'medium'} />
              )}

              <CustomButton
                onClick={() => action(elementSelected)}
                label={actionName}
                color={'green'}
                size={'medium'}
                disabled={disabledAction}
              />
            </HeaderAction>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
