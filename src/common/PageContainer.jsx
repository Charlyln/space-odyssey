import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { containerStyles } from '../utils/constants';

const ContainerStyle = styled('div')(({ border }) => ({
  height: 'calc(100vh - 106px)',
  border: border && 'solid 1px grey',
  ...containerStyles,
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
