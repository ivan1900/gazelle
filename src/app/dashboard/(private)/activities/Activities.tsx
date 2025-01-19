'use server';
import CurrentActivities from '@/app/components/activities/CurrentActivities';
import { Paper, Stack, Typography, Grid2 as Grid, Box } from '@mui/material';

export default async function Activity() {
  return (
    <>
      <Paper sx={{ minHeight: '3%', mt: '-25px', mx: '-26px' }}>
        <Typography variant="h6" sx={{ px: '15px', py: '2px' }}>
          Actividad
        </Typography>
      </Paper>
      <Stack direction="column" spacing={2} py={'10px'}>
        <Grid container>
          <Grid size={12}>
            <CurrentActivities />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
