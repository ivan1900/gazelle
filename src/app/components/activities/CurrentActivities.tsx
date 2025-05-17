'use client';
import {
  Box,
  FormControlLabel,
  Grid2 as Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import getActivitiesOnGoing from '@/app/server/actions/activity/getActivitiesOnGoing';
import { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import getActivitiesFinished from '@/app/server/actions/activity/getActivitiesFinished';

interface Props {
  refresh: number;
  refreshStatistics: () => void;
}

export default function CurrentActivities(props: Props) {
  const { refresh, refreshStatistics } = props;
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [showFinished, setShowFinished] = useState(false);

  const loadActivities = async () => {
    const result = showFinished
      ? await getActivitiesFinished(90)
      : await getActivitiesOnGoing();
    setActivities(result);
    refreshStatistics();
  };

  useEffect(() => {
    loadActivities();
    refreshStatistics();
  }, [refresh]);

  const handleOnChangeSwitch = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'} alignItems="center">
          <Typography>Actividades:</Typography>
          <FormControlLabel
            checked={showFinished}
            control={<Switch color="primary" />}
            label="Finalizadas"
            labelPlacement="end"
            onChange={handleOnChangeSwitch}
          />
        </Stack>
        <Box sx={{ overflow: 'auto', maxHeight: '75vh' }}>
          <Grid container>
            {activities.map((activity) => (
              <Grid
                key={activity.id}
                size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 4 }}
                display={'flex'}
                justifyContent={'center'}
              >
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  refresh={loadActivities}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
