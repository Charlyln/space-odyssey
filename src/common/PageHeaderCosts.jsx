import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { getImg } from '../utils/helper';

export default function PageHeaderCosts({ costs, elementName }) {
  const costItems = costs.filter((cost) => cost.craft === elementName);

  return (
    <Grid item xs={6}>
      <Typography variant='button' color='text.secondary' component='div'>
        Costs:
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {costItems.map((costItem) => (
          <div key={costItem.ressource} style={{ paddingRight: '4px' }}>
            <Card variant='outlined' sx={{ height: '70px', width: '50px', borderRadius: 0 }}>
              <CardMedia sx={{ height: '50px', width: '50px', margin: 'auto' }} image={getImg(costItem.ressource)} title={'steel'} />
              <CardContent style={{ padding: 0, textAlign: 'center', marginTop: '-5px' }}>
                <Typography variant='caption'>{costItem.value}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Grid>
  );
}
