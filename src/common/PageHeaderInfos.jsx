import { Grid, Typography } from '@mui/material';

export default function PageHeaderInfos({ children, title }) {
  return (
    <Grid item xs={6}>
      <Typography variant='button' color='text.secondary' component='div'>
        {title}
      </Typography>

      {children}
      {/* {imgParams && <CustomIcon size={25} icon={imgParams} />} */}

      {/* {infos.map((info) => (
        <Typography key={info.key} variant='subtitle2' color='text.secondary' component='div'>
          {`${info.key}: ${info.value}`}
        </Typography>
      ))} */}
    </Grid>
  );
}
