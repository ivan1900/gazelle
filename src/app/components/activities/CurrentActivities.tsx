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
import { useCallback, useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import getActivitiesFinished from '@/app/server/actions/activity/getActivitiesFinished';

interface Props {
  refreshKey: number;
}

export default function CurrentActivities(props: Props) {
  const { refreshKey } = props;
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [showFinished, setShowFinished] = useState(false);

  const loadActivities = useCallback(async () => {
    const result = showFinished
      ? await getActivitiesFinished(90)
      : await getActivitiesOnGoing();
    setActivities(result);
  }, [showFinished]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities, refreshKey]);

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
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              update={loadActivities}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
}
