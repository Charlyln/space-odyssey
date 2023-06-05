import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerStyle = styled(Card)(({ height, type }) => {
  const mt = type === 'body' ? '8px' : '0px';
  return {
    overflow: 'auto',
    height: `calc(${height} - ${mt})`,
    backgroundColor: 'transparent',
    position: 'relative',
    marginTop: mt,
    width: '100%',
    padding: '6px',
    '&::-webkit-scrollbar': {
      width: 5,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#555',
    },
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
