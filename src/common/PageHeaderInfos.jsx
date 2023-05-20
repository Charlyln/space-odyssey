import { Grid, Typography } from '@mui/material';
import { getImg } from '../utils/helpers/images.helper';

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

      {imgParams && <img style={{ width: '40px', height: '40px', marginTop: '10px' }} src={getImg(imgParams)} alt={imgParams} />}
    </Grid>
  );
}
