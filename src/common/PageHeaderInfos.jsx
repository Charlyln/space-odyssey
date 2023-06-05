import { Grid, Typography } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';
import CustomIcon from './CustomIcon';

export default function PageHeaderInfos({ title, infos, imgParams }) {
  return (
    <Grid item xs={4}>
      <Typography variant='button' color='text.secondary' component='div'>
        {title}
      </Typography>

      {infos.map((info) => (
        <Typography key={info.key} variant='subtitle2' color='text.secondary' component='div'>
          {`${info.key}: ${info.value}`}
        </Typography>
      ))}

      {imgParams && <CustomIcon size={25} icon={imgParams} />}
    </Grid>
  );
}
