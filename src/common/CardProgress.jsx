import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { colors } from '../utils/constants';

const BorderLinearProgress = styled(LinearProgress)(({ theme, height, rounded }) => ({
  height: height,
  borderRadius: rounded ? 5 : 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'unset',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: colors.green.primary,
  },
}));

export default function CardProgress({ progress, height, rounded }) {
  return <BorderLinearProgress variant='determinate' value={progress} height={height} rounded={rounded} />;
}
