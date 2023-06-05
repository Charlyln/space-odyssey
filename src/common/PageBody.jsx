import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { containerStyles } from '../utils/constants';

const ContainerStyle = styled(Card)(({ height, type }) => {
  const mt = type === 'body' ? '8px' : '0px';
  return {
    height: `calc(${height} - ${mt})`,
    position: 'relative',
    marginTop: mt,
    width: '100%',
    padding: '6px',
    ...containerStyles,
  };
});

export default function PageBody({ type, height, children }) {
  return (
    <Grid item xs={12}>
      <ContainerStyle height={height} type={type} variant='outlined'>
        {children}
      </ContainerStyle>
    </Grid>
  );
}
