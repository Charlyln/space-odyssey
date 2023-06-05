import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme, height }) => ({
  height: height,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'unset',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: 'green',
  },
}));

export default function CardProgress({ progress, height }) {
  return <BorderLinearProgress variant='determinate' value={progress} height={height} />;
}
