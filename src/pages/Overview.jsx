import React from 'react';
import { Card, CardMedia, Typography, Grid, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const items = [
  {
    name: 'Buildings',
  },
  {
    name: 'Research',
  },
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function Overview() {
  return (
    <Grid container alignItems='center'>
      {items.map((item) => (
        <Grid item xs={4} key={item.name} sx={{ padding: 1 }}>
          <Card style={{ borderRadius: 0, border: 'solid 1px turquoise' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                {item.name}
              </Typography>

              <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={6}>
                  Steel mine
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <BorderLinearProgress variant='determinate' value={50} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant='body2' color='text.secondary'>{`50%`}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Overview;
