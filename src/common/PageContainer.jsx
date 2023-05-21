import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerStyle = styled('div')(({ border }) => ({
  overflow: 'auto',
  height: 'calc(100vh - 106px)',
  border: border && 'solid 1px grey',
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
}));

export default function PageContainer({ children, border }) {
  return (
    <ContainerStyle border={border}>
      <Grid container alignItems='center'>
        {children}
      </Grid>
    </ContainerStyle>
  );
}
