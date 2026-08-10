'use client';
import {
  Box,
  FormControlLabel,
  Grid,
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
  }, [refresh, showFinished]);

  const handleOnChangeSwitch = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: '20px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography>Actividades:</Typography>
          <FormControlLabel
            checked={showFinished}
            control={<Switch color="primary" />}
            label="Finalizadas"
            labelPlacement="end"
            onChange={handleOnChangeSwitch}
          />
        </Stack>
        <Box sx={{ overflow: 'auto', maxHeight: '75vh', width: '100%' }}>
          <Grid container spacing={2} sx={{ p: 2, m: 0 }}>
            {activities.map((activity) => (
              <Grid
                key={activity.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ActivityCard activity={activity} refresh={loadActivities} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
