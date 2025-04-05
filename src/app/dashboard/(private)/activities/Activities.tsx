'use server';
import CurrentActivities from '@/app/components/activities/CurrentActivities';
import OperationBoard from '@/app/components/activities/OperationBoard';
import { Paper, Stack, Typography, Grid2 as Grid } from '@mui/material';

export default async function Activity() {
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
            <OperationBoard />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <CurrentActivities />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
