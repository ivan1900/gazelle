'use client';
import ActionSummary from '@/app/components/actionSummary/ActionSummary';
import CurrentActivities from '@/app/components/activities/CurrentActivities';
import OperationBoard from '@/app/components/activities/OperationBoard';
import { Paper, Stack, Typography, Grid2 as Grid } from '@mui/material';
import { useState } from 'react';

export default function Activity() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleReload = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Paper sx={{ minHeight: '3%', mt: '-25px', mx: '-26px' }}>
        <Typography fontWeight={400} sx={{ px: '15px', mt: '12px' }}>
          Actividad
        </Typography>
      </Paper>
      <Stack direction="column" spacing={2} py={'10px'}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <OperationBoard handleReload={handleReload} />
              <ActionSummary />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <CurrentActivities refreshKey={refreshKey} />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
