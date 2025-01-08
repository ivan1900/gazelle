import { ActivityStatusDict } from '@/app/server/shared/constants/ActivityStatusOption';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import { Box, Card, Chip, Grid2 as Grid, Typography } from '@mui/material';

interface Props {
  activity: ActivityInfo;
}

export default function ActivityCard(props: Props) {
  const { activity } = props;
  return (
    <Card sx={{ padding: '10px', margin: '10px' }}>
      <Grid container>
        <Grid size={6}>
          <Typography fontWeight={700}>{activity.name}</Typography>
        </Grid>
        <Grid size={3} justifyItems={'right'}>
          <Chip
            size="small"
            label={activity.type.isProductive ? 'Productiva' : 'Improdutiva'}
            color={activity.type.isProductive ? 'primary' : 'secondary'}
          />
        </Grid>
        <Grid size={3} justifyItems={'right'}>
          <Chip
            size="small"
            variant="outlined"
            label={activity.type.name}
            sx={{
              color: activity.type.color,
              borderColor: activity.type.color,
            }}
          />
        </Grid>
        <Grid size={12} display={'flex'} direction={'row'}>
          <Typography
            fontWeight={600}
            fontSize={'16px'}
            sx={{ marginRight: '8px' }}
          >
            Descripción:
          </Typography>
          <Typography>{activity.description}</Typography>
        </Grid>
        <Grid size={12} display={'flex'} direction={'row'}>
          <Typography
            fontWeight={600}
            fontSize={'16px'}
            sx={{ marginRight: '8px' }}
          >
            Estado:
          </Typography>
          <Typography>
            {
              ActivityStatusDict.filter(
                (item) => item.value === activity.status
              )[0].label
            }
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography color="text.secondary" fontSize={'12px'}>
            Creada: {activity.createdAt?.toLocaleString()}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography color="text.secondary" fontSize={'12px'}>
            Actualizada: {activity.updatedAt?.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
