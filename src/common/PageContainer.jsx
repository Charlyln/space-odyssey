import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerStyle = styled('div')(() => ({
  overflow: 'auto',
  height: 'calc(100vh - 120px)',
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

export default function PageContainer({ children }) {
  return (
    <ContainerStyle>
      <Grid container alignItems='center' sx={{ padding: 1 }}>
        {children}
      </Grid>
    </ContainerStyle>
  );
}
